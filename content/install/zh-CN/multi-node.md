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
