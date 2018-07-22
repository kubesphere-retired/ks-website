## All-in-One 模式

`All-in-One` 模式即单节点部署，仅建议您用来测试或熟悉部署流程和了解 KubeSphere 功能特性，在正式使用环境建议使用 `multi-node` 模式，请参考下文的 `multi-node` 模式 。

### 第一步: 准备节点

您可以参考以下节点规格准备一台符合要求的主机节点开始 `all-in-one` 模式的部署。

| 操作系统 | 最小配置 | 推荐配置 |
| --- | --- | --- |
| ubuntu 16.04 LTS 64bit | CPU：8 核 <br/> 内存：12G <br/> 磁盘：40G | CPU：16 核 <br/> 内存：32G <br/> 磁盘：100G |

### 第二步: 准备 KubeSphere 安装文件

**1.**  KubeSphere 官方下载地址：

[KubeSphere Installer 下载](https://drive.yunify.com/s/jV8QSnO8KkWLu4V)（待更新）

> 注：如果您无法连接外网，可参考[附录2 • 离线部署说明](#附录2)进行离线部署。

**2.** 获取 KubeSphere 安装包后，执行以下命令解压安装包：

```shell
$ tar -zxvf kubesphere-all-express-1.0.0-alpha.tar.gz
```

**3.** 进入 “`kubesphere-all-express-1.0.0-alpha`” 文件夹

```
$ cd kubesphere-all-express-1.0.0-alpha
```

###  第三步: 执行部署

> 提示：
> - 通常情况您不需要修改任何配置，直接安装即可。
> - 若您需要自定义配置文件的安装参数，如网络、存储等相关内容需在 **`conf/vars.yml`** 配置文件中指定或修改。
> - 网络：默认插件 `calico`。
> - 支持存储类型：`GlusterFS、CephRBD、local-storage`，存储配置相关的详细信息请参考[附录3 • 存储配置说明](#附录3)。
> - All-in-One 默认会用 local storage 作为存储类型，由于 local storage 不支持动态分配，用户安装完毕在 KubeSphere 控制台创建存储卷的时候需要预先创建 persistent volume (PV)。Installer 预先创建了 8 个 10G local storage 的 PV 供用户直接试用。

KubeSphere 部署过程中将会自动化地进行环境和文件监测、平台依赖软件的安装、Kubernetes 和 etcd 的自动化部署，以及存储的自动化配置。KubeSphere 安装包将会自动安装一些依赖软件，如 ansible (v2.4+)，Python-netaddr (v0.7.18+)，Jinja (v2.9+)。

> 注：以上依赖软件的自动安装将会用到 pip 源，如果使用国内网络环境，pip 下载速度可能受限，可参考[附录1 • pip 源配置说明](#附录1)配置国内 pip 源。

当前节点的系统为 **`Ubuntu 16.04`** ，以下步骤均以 **`ubuntu`** 用户进行操作。

**1.** 进入 `scripts` 目录

```
$ cd scripts
```

**2.** 执行 `install.sh` 脚本：

```
$ ./install.sh
```

**3.** 输入数字 `1` 选择第一种 all-in-one 模式开始部署：

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
Please Select An Option: 
```

**4.** 测试 KubeSphere 单节点部署是否成功：

**(1)** 待 install.sh 执行完后，当看到如下 `"Successful"` 界面，则说明 KubeSphere 安装成功：

```
Play Rep  ****************************************
KubeSphere   : ok=69 changed=68 unreachable=0 
failed=0
Succesful!
##################################################
KubeSphere is running！
Matser IP: 121.10.121.111
Ks-console-nodeport: 32117
Ks-apiserver-nodeport 32002
##################################################
```

**(2)** 那么您就可以通过浏览器，使用集群中任一节点的 IP 地址和端口号（端口号将显示在脚本执行完之后的界面 "ks-console-nodeport" 处），也可以通过公网 IP 及端口转发的方式访问控制台，如：[http://139.198.121.143:8080](http://139.198.121.143:8080), 即可进入 KubeSphere 登录界面，能看到如下用户界面说明 KubeSphere 能够正常访问和使用：

![](/pic02.png)

KubeSphere 部署成功后，请参考[《KubeSphere 用户指南》](https://kubesphere.qingcloud.com)。