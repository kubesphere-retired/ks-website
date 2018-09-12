## Multi-Node模式

`Multi-Node` 即多节点集群部署，部署前建议您选择集群中任意一个节点作为一台任务执行机 `(taskbox)`，为准备部署的集群中其他节点执行部署的任务，且 taskbox 应能够与待部署的其他节点进行 `ssh 通信`。

### 第一步: 准备主机

您可以参考以下节点规格 准备 **`至少 2 台`** 符合要求的主机节点开始 `multi-node` 模式的部署。

| 操作系统 | 最小配置 | 推荐配置 |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |
| CentOS 7.4 64bit | CPU：8 核 <br/> 内存：12 G <br/> 磁盘：40 G | CPU：16 核 <br/> 内存：32 G <br/> 磁盘：100 G |

以下用一个示例介绍 multi-node 模式部署多节点，此示例准备了 3 台主机，以主机名为 master 的节点作为任务执行机 taskbox，各节点主机名可由用户自定义。假设主机信息如下所示：

| 主机IP | 主机名 | 集群角色 |
| --- | --- | --- |
|192.168.0.10|master|master， etcd， node|
|192.168.0.20|node1|node|
|192.168.0.30|node2|node|

**集群架构：** 单 master 单 etcd 多 node

![Architecture](/pic04.svg)

> `etcd` 作为一个高可用键值存储系统, etcd 节点个数至少需要 1 个，部署多个 etcd 能够使集群更可靠，etcd 节点个数建议设置为`奇数个`，在当前 KubeSphere Express 版本暂支持单个 etcd 节点，将会在下一个 Advanced Edition 版本中支持 etcd 多节点部署。

### 第二步: 准备安装包

**1.**  下载 [KubeSphere Installer](https://kubesphere.io/download/)，跳转到下载页面后也可以通过 `curl -O url` 或 `wget url` 命令获取 Installer。

|KubeSphere 版本|支持系统（将支持更多系统）|
|--------------|-------|
|Dev 版|Ubuntu 16.04 LTS 64bit， <br> CentOS 7.4 64bit| 
|Stable (Alpha 版)|Ubuntu 16.04 LTS 64bit| 
|Offline 版|Ubuntu 16.04.4 LTS 64bit，<br> Ubuntu 16.04.5 LTS 64bit|

**2.** 获取 KubeSphere 安装包后，执行以下命令解压安装包。以 Alpha 版本的安装包为例，执行以下命令解压安装包。若下载的是 Dev 或 Offline 版本，则替换为 Dev 或 Offline 对应的包名和目录名。

```bash
$ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** 进入 “`kubesphere-all-express-1.0.0-alpha`” 文件夹

```bash
$ cd kubesphere-all-express-1.0.0-alpha
```

**4.** 编辑主机配置文件 `conf/hosts.ini`，为了对待部署目标机器及部署流程进行集中化管理配置，集群中各个节点在主机配置文件 `hosts.ini` 中应参考如下配置，以 Alpha 版本的主机配置文件为例。以下示例在 Ubuntu 16.04 上使用 ubuntu 用户安装，每台机器信息占一行，不能分行。

**Alpha 版示例：**

```ini
[all]
maser  ansible_connection=local local_release_dir={{ansible_env.HOME}}/releases ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node1  ansible_host=192.168.0.20 ip=192.168.0.20 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password
node2  ansible_host=192.168.0.30 ip=192.168.0.30 ansible_user=ubuntu ansible_become=yes ansible_become_user=root ansible_become_pass=password

[kube-master]
master

[kube-node]
master
node1
node2

[etcd]
master

[k8s-cluster:children]
kube-node
kube-master
```

> 说明：
>
> - [all] 中需要修改集群中各个节点的内网 IP 和主机 ubuntu 用户密码。主机名为 "master" 的节点作为 taskbox 仅需要将 ansible\_become\_pass 替换为当前任务执行机的 ubuntu 用户登录密码，[all] 中其它参数比如 node1 和 node2 需要分别替换 "ansible\_host" 和 "ip" 为当前 node1 和 node2 的内网 IP，node1 和 node2 的 "ansible\_become\_pass" 即替换为各自主机的 ubuntu 用户登录密码。
> -  "master" 节点作为 taskbox，用来执行整个集群的部署任务，同时 "master" 节点在 kubernetes 集群中也作为 master 和 etcd ，应将主机名 "master" 填入 [kube-master] 和 [etcd] 部分。
> - 主机名为 "master"，"node1"，"node2" 的节点， 作为 kubernetes 集群的 node 节点，应填入 [kube-node] 部分。<br>
>
> 参数解释：<br>
> 
> - ansible_host: 集群中将要连接的主机名 。
> - ip: 集群中将要连接的主机 IP。
> - ansible_user: 默认使用的 SSH 登录用户名。 
> - ansible_become: 是否允许权限升级 (yes/no)
> - ansible\_become\_user: 权限升级用户（root） 
> - ansible\_become\_pass: 待连接主机的密码。


- 若下载的是 Dev 或 Offline 版本的安装包， 安装包中 `conf/hosts.ini` 的 `[all]` 部分参数如 `ansible_host` 、 `ip` 、 `ansible_become_pass` 和 `ansible_ssh_pass` 需替换为您实际部署环境中各节点对应的参数。注意 `[all]` 中参数的配置方式分为 root 和 非 root 用户，非 root 用户的配置方式在安装包的 `conf/hosts.ini` 的注释部分已给出示例，请根据实际的用户身份修改配置参数。


**5.** Multi-Node 模式进行多节点部署时，您需要预先准备好对应的存储服务端，再参考<a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">存储配置</a> 配置集群的存储类型。网络、存储等相关内容需在 ` conf/vars.yml` 配置文件中指定或修改。

> 说明：
> - 根据配置文件按需修改相关配置项，未做修改将以默认参数执行。
> - 由于 Kubernetes 集群的 Cluster IP 子网网段默认是 10.233.0.0/18，Pod 的子网网段默认是 10.233.64.0/18，因此部署 KubeSphere 的节点 IP 地址范围不应与以上两个网段有重复，若遇到地址范围冲突可在配置文件 `conf/vars.yaml` 修改 `kube_service_addresses` 或 `kube_pods_subnet` 的参数。
> - 网络：默认插件 `calico`。
> - 支持存储类型：QingCloud-CSI、GlusterFS、CephRBD， 存储配置相关的详细信息请参考 <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">存储配置</a>
> - 通常情况您需要配置持久化存储，multi-node 不支持 local storage，因此把 local storage 的配置修改为 false，然后配置持久化存储如 QingCloud-CSI、GlusterFS 或 CephRBD。如果使用 [青云云平台块存储](https://docs.qingcloud.com/product/storage/volume/) 作为持久化存储，需要安装 [QingCloud-CSI 插件](https://github.com/yunify/qingcloud-csi/blob/master/README_zh.md)，且需要有操作 [QingCloud IaaS 平台](https://console.qingcloud.com/login) 资源的权限，如下所示为配置 QingCloud-CSI （`qy_access_key_id`、`qy_secret_access_key` 和 `qy_zone` 应替换为您实际环境的参数）。
> - 安装 KubeSphere 后，如果需要对集群节点扩容，可参考 <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#集群节点扩容说明" target="_blank">集群节点扩容说明</a>。

**存储配置示例**
 
```yaml
# Local volume provisioner deployment(Only all-in-one)
local_volume_provisioner_enabled: false
local_volume_provisioner_storage_class: local
local_volume_is_default_class: false

# QingCloud-CSI 
qy_csi_enabled: true
qy_csi_is_default_class: true
# Access key pair can be created in QingCloud console
qy_access_key_id: ACCESS_KEY_ID
qy_secret_access_key: ACCESS_KEY_SECRET
# Zone should be the same as Kubernetes cluster
qy_zone: ZONE
# QingCloud IaaS platform service url.
qy_host: api.qingcloud.com
qy_port: 443
qy_protocol: https
qy_uri: /iaas
qy_connection_retries: 3
qy_connection_timeout: 30
# The type of volume in QingCloud IaaS platform. 
# 0 represents high performance volume. 
# 3 respresents super high performance volume. 
# 1 or 2 represents high capacity volume depending on cluster‘s zone.
qy_type: 0
qy_maxSize: 500
qy_minSize: 10
qy_stepSize: 10
qy_fsType: ext4

```

### 第三步: 安装 KubeSphere

KubeSphere 多节点部署会自动化地进行环境和文件监测、平台依赖软件的安装、Kubernetes 和 etcd 集群的自动化部署，以及存储的自动化配置。Installer 默认安装的 Kubernetes 版本是 v1.10.5，目前已支持 v1.11.2，如需安装 v1.11.2 可在配置文件 `conf/vars.yaml` 中修改 `kube_version` 的参数为 v1.11.2，再执行安装，安装成功后可通过 KubeSphere 控制台右上角点击关于查看安装的版本。KubeSphere 安装包将会自动安装一些依赖软件，如 Ansible (v2.4+)，Python-netaddr (v0.7.18+)，Jinja (v2.9+)。

参考以下步骤开始 multi-node 部署：

**1.** 进入 `scripts` 目录

```bash
$ cd scripts
```

**2.** 执行 `install.sh` 脚本：

```bash
$ ./install.sh
```

**3.** 输入数字 `2` 选择第二种 multi-node 模式开始部署：

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Cluster-scaling
*   4) Quit
################################################
https://kubesphere.io/               2018-07-27
################################################
Please input an option: 2
```

**提示：**

> - 安装程序会提示您是否已经配置过存储，若未配置请输入 "no"，返回目录继续配置存储并参考 <a href="https://docs.kubesphere.io/express/zh-CN/KubeSphere-Installer-Guide/#存储配置说明" target="_blank">存储配置</a>
> - Dev 和 Offline 版本的安装包不再需要配置 ssh 免密登录，只提示用户是否配置过存储。
> - 若下载的是 Alpha 版本的安装包， taskbox 需配置与待部署集群中所有节点的 `ssh 免密登录`，若还未配置 ssh 免密登录，在执行 `install.sh` 安装脚本时会提示用户是否已经配置免密登录，输入 "no" 安装程序将会帮您自动配置 ssh 免密登录，如下图所示:

```bash
######################################################################
         KubeSphere Installer Menu
######################################################################
*   1) All-in-one
*   2) Multi-node
*   3) Cluster-scaling
*   4) Quit
######################################################################
https://kubesphere.io/                                      2018-07-27
######################################################################
Please input an option: 2
2
Have you configured storage parameters in conf/vars.yml yet?  (yes/no) 
yes
Password-less SSH communication is necessary，have you configured yet? 
If not, it will be created automatically. (yes/no) 
no 
Generating public/private rsa key pair.
Created directory '/home/ubuntu/.ssh'.
Your identification has been saved in /home/ubuntu/.ssh/id_rsa.
Your public key has been saved in /home/ubuntu/.ssh/id_rsa.pub.
```


**4.** 测试 KubeSphere 集群部署是否成功：

**(1)** 待 `install.sh` 执行完后，当看到如下 "Successful" 界面，则说明 KubeSphere 安装成功：


```bash
PLAY RECAP *********************************************
KubeSphere     : ok=69 changed=68 unreachable=0 failed=0
Succesful!
########################################################
KubeSphere is running！
Matser IP: 192.168.100.10
ks-console-nodeport: 32117
ks-apiserver-nodeport: 32002
########################################################
```

**(2)** 以上可以看到两个 nodeport，也可以通过命令 `kubectl get svc -n kubesphere-system` 查看端口号。在 Kubernetes 中 nodeport 是提供给集群外部客户访问该 Service 入口的一种方式，Kubernetes 中的 nodeport 一般是高位 30000 - 32767。您可以通过浏览器，使用集群中任一节点的 IP 地址和端口号即 `<NodeIP>:ks-console-nodeport` 访问 KubeSphere 控制台，如上图 [http://192.168.100.10:32117](http://192.168.100.10:32117，)。由于服务的常用访问端口通常是低位，因此也可以通过公网 IP 并将高位端口转发后访问控制台，如：[http://139.198.121.143:8080](http://139.198.121.143:8080)，即可进入 KubeSphere 登录界面，能看到如下用户界面说明 KubeSphere 能够正常访问和使用：

> 注： 若公网 IP 有防火墙，请在防火墙添加规则放行对应的端口，外部才能够访问。

![login](/pic02.png)

KubeSphere 部署成功后，可以使用以下的用户名和密码登录 KubeSphere 控制台体验：

> 用户名: admin@kubesphere.io <br />
> 密码: passw0rd

关于如何使用请参考 <a href="https://docs.kubesphere.io/express/zh-CN/user-case/" target="_blank">《KubeSphere 用户指南》</a>。
