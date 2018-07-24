## 存储配置

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
