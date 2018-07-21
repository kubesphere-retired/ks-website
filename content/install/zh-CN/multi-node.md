## Multi-Node模式

`Multi-Node` 即多节点集群部署，部署前建议您选择集群中任意一个节点作为一台任务执行机 `(taskbox)`，为准备部署的集群中其他节点执行部署的任务，且 taskbox 应能够与待部署的其他节点进行 `ssh 通信`。

### 第一步: 准备主机

您可以参考以下节点规格 准备 **`至少 2 台`** 符合要求的主机节点开始 `multi-node` 模式的部署。

| 操作系统 | 最小配置 | 推荐配置 |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 核 <br/> 内存：12G <br/> 磁盘：40G | CPU：16 核 <br/> 内存：32G <br/> 磁盘：100G |

此示例准备了 3 台主机，假设主机信息为 192.168.0.10 (node1) / 192.168.0.20 (node2) / 192.168.0.30 (node3)，以 node1 作为任务执行机 taskbox，各节点主机名可由用户自定义。

**集群架构：** 单master 单 etcd 多 node

![](/pic04.png)

> `etcd` 作为一个高可用键值存储系统, etcd 节点个数至少需要 1 个，但部署多个 etcd 能够使集群更可靠，etcd 节点个数建议设置为`奇数个`，在当前 KubeSphere Express 版本暂支持单个 etcd 节点，将会在下一个 Advanced Edition 版本中支持 etcd 多节点部署。

### 第二步: 准备 KubeSphere 安装包

**1.** KubeSphere 官方下载地址：

[KubeSphere Installer 下载](https://drive.yunify.com/s/jV8QSnO8KkWLu4V)（待更新）

> 注：如果您无法连接互联网，可参考[附录2 • 离线部署说明](#附录2)进行离线部署

**2.** 获取 KubeSphere 安装包后，执行以下命令解压安装包：

```
$ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** 进入 “`kubesphere-all-express-1.0.0-alpha`” 文件夹

```
$ cd kubesphere-all-express-1.0.0-alpha
```

**4.** 编辑主机配置文件 `conf/hosts.ini`，为了对待部署目标机器及部署流程进行集中化管理配置，集群中各个节点在主机配置文件 `hosts.ini` 中应参考如下配置：

> 注：本示例集群一共三个节点, 各节点主机名可由用户自定义, 修改配置文件脚本时不能手动换行

```
[all]
node1  ansible_connection=local local_release_dir={{ansible_env.HOME}}/releases ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node2  ansible_host=192.168.0.20 ip=192.168.0.20 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node3  ansible_host=192.168.0.30 ip=192.168.0.30 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password

[kube-master]
node1

[kube-node]
node1
node2
node3

[etcd]
node1

[k8s-cluster:children]
kube-node
kube-master
```

> 说明：
> - [all] 中应填写集群中各个节点的内网 IP 信息及参数，node1 作为 taskbox 在 [all] 中参数仅需要将 ansible_become_pass 替换为当前任务执行机的登录密码，[all] 中其它参数比如 node2 和 node3 仅需要替换 "ansible_host" 和 "ip" 为当前 node2 和 node3 的内网 IP，node2 和 node3 的 "ansible_become_pass" 即替换为各自主机的登录密码
> - node1 作为 taskbox，用来执行整个集群的部署任务，同时也是 kubernetes 集群的 master 节点和 etcd 节点，应填入 [kube-master] 和 [etcd] 部分
> - node1，node2，node3 是 kubernetes 集群的 node 节点，应填入 [kube-node] 部分

**5.** Multi-Node 模式进行多节点部署时，您需要预先准备好对应的存储服务器，再参考[附录3 • 存储配置说明](#附录3) 配置集群的存储类型。网络、存储等相关内容需在 `vars.yml` 配置文件中指定或修改，可执行以下命令通过Vim对 `vars.yml` 进行编辑：

```
$ vi conf/vars.yml
```

> 说明：
> - 根据配置文件按需修改相关配置项，未做修改将以默认参数执行。
> - 网络：默认插件`calico`
> - 支持存储类型：`GlusterFS、CephRBD`， 存储配置相关的详细信息请参考[附录3 • 存储配置说明](#附录3)

### 第三步: 安装 KubeSphere

KubeSphere 多节点部署同样会自动化地进行环境和文件监测、平台依赖软件的安装、`Kubernetes` 和 `etcd` 集群的自动化部署，以及存储的自动化配置。KubeSphere 安装包将会自动安装一些依赖软件，如 ansible (v2.4+)，Python-netaddr (v0.7.18+)，Jinja (v2.9+)。

> 注：安装以上依赖软件需要用到 pip 源，如果使用国内网络环境，pip 下载速度可能受限，可参考[附录1 • pip 源配置说明](#附录1)配置国内 pip 源

当前节点的系统为 **`Ubuntu 16.04`** ，以下步骤均以 **`ubuntu`**  用户进行操作。

请按以下步骤执行 KubeSphere 多节点部署：

**1.** 进入 `scripts` 目录

```
$ cd scripts
```

**2.** 执行 `install.sh` 脚本：

```
$ ./install.sh
```

**3.** 输入数字 `2` 选择第二种 multi-node 模式开始部署：

```
##################################################
KubeSphere Installer Menu
##################################################
*  1）All-in-one
*  2）Multi-node
*  3）Quit
##################################################
Https://kubesphere.io/                  2018-07-27
##################################################
Please Select An Option: 2
2
```

**4.** 测试 KubeSphere 集群部署是否成功：

**(1)** 待 `install.sh` 执行完后，当看到如下 "Successful" 界面，则说明 KubeSphere 安装成功：


```
Play Rep  ****************************************
KubeSphere   : ok=69 changed=68 unreachable=0 
failed=0
Succesful!
##################################################
KubeSphere is running！
Matser IP: 10.160.6.6
Ks-console-nodeport: 32117
Ks-apiserver-nodeport 32002
##################################################
```

**(2)** 那么您就可以通过浏览器，使用集群中任一节点的 IP 地址和端口号（端口号将显示在脚本执行完之后的界面 "ks-console-nodeport" 处），也可以通过公网 IP 及端口转发的方式访问控制台，如：[http://139.198.121.143:8080](http://139.198.121.143:8080), 即可进入 KubeSphere 登录界面，能看到如下用户界面说明 KubeSphere 能够正常访问和使用：

![](/pic02.png)

KubeSphere 部署成功后，请参考[《KubeSphere 用户指南》](https://kubesphere.qingcloud.com)。

---

## 附录1：pip 源配置说明

> 如果使用国内网络环境，pip 下载速度可能受限，可按如下方法配置国内 pip 源

```
$ mkdir ~/.pip
```

```
$ cat > ~/.pip/pip.conf << EOF
[global]
trusted-host=mirrors.aliyun.com
index-url=https://mirrors.aliyun.com/pypi/simple/
EOF
```

## 附录2：离线部署说明

1. 下载安装包以及离线部署 Repos
2. 解压安装包，并将 Repos 解压后拷贝到安装包中的 Repos 目录下
3. 执行 installer 初始化脚本: scripts/InitInstaller.sh，安装 installer 相关依赖软件。
4. 修改配置文件，同在线安装。
5. 执行部署

```
$ scripts/install.sh
```

## 附录3：存储配置说明

### 配置存储类型

可使用 `GlusterFS`、`CephRBD` 作为持久化存储，需提前准备相关存储服务端。

 在您准备好存储服务端以后，只需要参考以下表中的参数说明，在 `conf` 目录下的 `vars.yml` 中，根据您存储服务端所支持的存储类型，在 `vars.yml` 的 `# Ceph_rbd  deployment` 或 `# GlusterFS  provisioner deployment` 或 `# Local volume provisioner deployment(Only all-in-one)` 部分，参考脚本中的示例修改对应参数，即可完成 Kubernetes 集群存储类型的配置。

> 1. KubeSphere 安装过程中程序将会根据用户在 vars.yml 里选择配置的存储类型如 GlusterFS 或 CephRBD，进行自动化地安装对应 Kubernetes 集群所需的GlusterFS Client 或 CephRBD Client，无需手动安装 Client。
> 2. `Ceph` 集群部署可参考 [Install Ceph](http://docs.ceph.com/docs/master/)
> 3. `Gluster` 集群部署可参考 [Install Gluster](https://www.gluster.org/install/) 或 [Gluster Docs](http://gluster.readthedocs.io/en/latest/Install-Guide/Install/) 并且需要安装[Heketi 管理端](https://github.com/heketi/heketi/tree/master/docs/admin)
> 4. Kubernetes 集群中不可同时存在两个默认存储类型，若要指定默认存储类型前请先确保当前集群中无默认存储类型。

以下对存储相关配置做简要说明(参数详解请参考 [storage classes](https://kubernetes.io/docs/concepts/storage/storage-classes/) )：

| **Local volume** | **Description** |
| --- | --- |
| local\_volume\_provisioner\_enabled | 是否使用local\_volume作为持久化存储  是: true; 否: false |
| local\_volume\_provisioner\_storage\_class | storage\_class名称   默认：local-storage |
| local\_volume\_provisioner\_namespace | local\_volume相关资源对象所在namespace  默认：kube-system |
| local\_volume\_is\_default\_class | 是否设定为默认storage\_class 是: true; 否: false <br/> 注：系统中存在多种storage\_class时，只能设定一种为：default\_class |
| local\_volume\_provisioner\_base\_dir | 主机存储盘挂载路径  默认：/mnt/disks |

<br/>

| **Ceph\_RBD** | **Description** |
| --- | --- |
| ceph\_rbd\_enabled | 是否使用 ceph\_RBD 作为持久化存储，是: true; 否: false |
| ceph\_rbd\_storage\_class | storage\_class 名称 |
| ceph\_rbd\_is\_default\_class | 是否设定为默认 storage\_class 是: true; 否: false <br/> 注：系统中存在多种 storage\_class 时，只能设定一种为：default\_class |
| ceph\_rbd\_monitors | 根据 Ceph RBD 服务端配置填写，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_admin\_id | 能够在存储池中创建 images 的客户端 ID 默认: admin，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_admin\_secret | Admin_id 的 secret，安装程序将会自动在 kube-system 项目内创建此 secret，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_pool | 可使用的 CephRBD 存储池，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_user\_id | 用于映射 RBD images 的 ceph 客户端 ID 默认: admin，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_user\_secret | User_id 的 secret，需注意在所使用 rbd image 的项目内都需创建此 Secret，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_fsType | kubernetes 支持的 fsType，默认：ext4，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
| ceph\_rbd\_imageFormat | CephRBD images 格式，默认："1"，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd) |
|ceph\_rbd\_imageFeatures| 当 ceph_rbd_imageFormat 字段不为 1 时需填写此字段，可参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#ceph-rbd)|

> 注： 存储类型中创建 secret 所需 ceph secret 如 ceph_rbd_admin_secret 和 ceph_rbd_user_secret 可在 ceph 服务端通过以下命令获得：

```
$ ceph auth get-key client.admin
```
<br/>

| **GlusterFS（需提供 heketi 所管理的 glusterfs 集群）**| **Description** |
| --- | --- |
| glusterfs\_provisioner\_enabled | 是否使用 GlusterFS 作为持久化存储，是: true; 否: false |
| glusterfs\_provisioner\_storage\_class | storage\_class 名称 |
| glusterfs\_is\_default\_class | 是否设定为默认 storage\_class，是: true; 否: false <br/> 注：系统中存在多种 storage\_class 时，只能设定一种为：default\_class| --- | --- |glusterfs\_provisioner\_resturl | Heketi 服务 url，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) | glusterfs\_provisioner\_clusterid | Heketi 服务端输入 heketi-cli cluster list 命令获得，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_restauthenabled | Gluster 启用对 REST 服务器的认证,参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_resturl | Heketi 服务端 url，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_clusterid | Gluster 集群 id，登录 heketi 服务端输入 heketi-cli cluster list 得到 Gluster 集群 id，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_restuser | 能够在 Gluster pool 中创建 volume 的 Heketi 用户，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_secretName | secret 名称，安装程序将会在 kube-system 项目内自动创建此 secret，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_gidMin | glusterfs\_provisioner\_storage\_class 中 GID 的最小值，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_gidMax | glusterfs\_provisioner\_storage\_class 中 GID 的最大值，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| glusterfs\_provisioner\_volumetype | Volume 类型，参数配置请参考[Kubernetes 官方文档](https://kubernetes.io/docs/concepts/storage/storage-classes/#glusterfs) |
| jwt\_admin\_key | heketi 服务器中 /etc/heketi/heketi.json 的 jwt.admin.key 字段 |

> 注： Glusterfs 存储类型中所需的 `glusterfs_provisioner_clusterid` 可在 glusterfs 服务端通过以下命令获得：

```
 $ export HEKETI_CLI_SERVER=http://localhost:8080
 $ heketi-cli cluster list
```

### local volume 使用方法(不属于 KubeSphere 安装步骤)

此小节不属于 KubeSphere 安装步骤，仅帮助用户使用 local volume。

> local volume 数据卷 **仅用于 all-in-one 单节点部署**。

使用 `local volume` 的基本流程需要参考如下步骤：

1. 预先在宿主机创建文件夹

2. 创建 PV

3. 通过 KubeSphere 创建数据卷

具体步骤如下：

- 登录宿主机，创建文件夹，以文件夹 vol-test 为例，执行以下命令：

```
$ mkdir -p /mnt/disks/vol-test
```

- 创建 pv

  - pv.yaml 文件定义

```
apiVersion: v1
kind: PersistentVolume
metadata:
  name: pv-local
spec:
  capacity:
    storage: 10Gi 
  # volumeMode field requires BlockVolume Alpha feature gate to be enabled.
  volumeMode: Filesystem
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: local
  local:
    path: /mnt/disks/vol-test
  nodeAffinity:
    required:
      nodeSelectorTerms:
      - matchExpressions:
        - key: kubernetes.io/hostname
          operator: In
          values:
          - kubesphere
```

- 执行创建命令

```
$ kubectl create -f pv-local.yaml
```

- 执行以下命令验证创建结果

```
$ kubectl get pv
NAME         CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS      CLAIM        STORAGECLASS    REASON    AGE
pv-local     10Gi       RWO            Delete           Available                local                     4s
```

- 上述工作完成后可在 KubeSphere UI 创建存储卷：

> 注：Local volume 存储卷创建成功后为 Pending 属于正常状态，当创建 Workload 调度 Pod 后存储卷状态即可变化为 Bound

- 如何清理存储卷

  1. KubeSphere UI 删除当前未挂载的存储卷

  2. 登录宿主机，删除 PV

  3. 删除 PV 关联的文件夹以清理数据

> Local Volume 不支持动态分配 (Dynamic Provisioning) 方式， 如果希望体验 KubeSphere 推荐的动态分配 (Dynamic Provisioning) 方式创建存储卷，请配置 `GlusterFS` 和 `Ceph RBD` 存储服务端参数。