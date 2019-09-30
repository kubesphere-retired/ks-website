## 在 Kubernetes 在线部署 KubeSphere

KubeSphere 除了支持部署在 Linux 之上，还支持在已有 Kubernetes 集群之上部署 [KubeSphere](https://kubesphere.io/)，支持在线和离线两种安装方式。

## 准备工作

1. 确认现有的 `Kubernetes` 版本在 `>=1.13.0`，KubeSphere 依赖 `Kubernetes 1.13.0` 版本之后的新特性，可以在执行 `kubectl version` 来确认 :

```bash
$ kubectl version | grep Server
Server Version: version.Info{Major:"1", Minor:"13", GitVersion:"v1.13.5", GitCommit:"2166946f41b36dea2c4626f90a77706f426cdea2", GitTreeState:"clean", BuildDate:"2019-03-25T15:19:22Z", GoVersion:"go1.11.5", Compiler:"gc", Platform:"linux/amd64"}
```

> 说明：注意输出结果中的 `Server Version` 这行，如果显示 `GitVersion` 大于 `v1.13.0`，Kubernetes 的版本是可以安装的。如果低于 `v1.13.0` ，可以查看 [Upgrading kubeadm clusters from v1.12 to v1.13](https://v1-13.docs.kubernetes.io/docs/tasks/administer-cluster/kubeadm/kubeadm-upgrade-1-13/) 先升级下 K8s 版本。

2. 确认已安装 `Helm`，并且 `Helm` 的版本至少为 `2.10.0`。在终端执行 `helm version`，得到类似下面的输出：

```bash
$ helm version
Client: &version.Version{SemVer:"v2.13.1", GitCommit:"618447cbf203d147601b4b9bd7f8c37a5d39fbb4", GitTreeState:"clean"}
Server: &version.Version{SemVer:"v2.13.1", GitCommit:"618447cbf203d147601b4b9bd7f8c37a5d39fbb4", GitTreeState:"clean"}
```

> 说明：
> - 如果提示 `helm: command not found`, 表示还未安装 `Helm`。参考这篇 [Install Helm](https://helm.sh/docs/using_helm/#from-the-binary-releases) 安装 `Helm`, 安装完成后执行  `helm init`；
> - 如果 `helm` 的版本比较老 (<2.10.0), 需要首先升级，参考 [Upgrading Tiller](https://github.com/helm/helm/blob/master/docs/install.md#upgrading-tiller) 升级。

3. 集群现有的可用内存至少在 `10G` 以上。 如果是执行的 `allinone` 安装，那么执行 `free -g` 可以看下可用资源

```bash
root@kubernetes:~# free -g
              total        used        free      shared  buff/cache   available
Mem:              16          4          10           0           3           2
Swap:             0           0           0
```

4. (非必须) KubeSphere 非常建议配合持久化存储使用，执行 `kubectl get sc` 看下当前是否设置了默认的 `storageclass`。

```bash
root@kubernetes:~$ kubectl get sc
NAME                      PROVISIONER               AGE
ceph                      kubernetes.io/rbd         3d4h
csi-qingcloud (default)   disk.csi.qingcloud.com    54d
glusterfs                 kubernetes.io/glusterfs   3d4h
```

> 提示：若未设置持久化存储，安装将默认使用 hostpath，该方式能顺利安装，但可能会由于 Pod 漂移带来其它问题，正式环境建议配置 StorageClass 使用持久化存储。

如果你的 Kubernetes 环境满足以上的要求，那么可以接着执行下面的步骤了。

## 部署 KubeSphere

1. 在 Kubernetes 集群中创建名为 `kubesphere-system` 和 `kubesphere-monitoring-system` 的 `namespace`。

```
$ cat <<EOF | kubectl create -f -
---
apiVersion: v1
kind: Namespace
metadata:
    name: kubesphere-system
---
apiVersion: v1
kind: Namespace
metadata:
    name: kubesphere-monitoring-system
EOF
```

2. 创建 Kubernetes 集群 CA 证书的 Secret。

> 注：按照当前集群 ca.crt 和 ca.key 证书路径创建（Kubeadm 创建集群的证书路径一般为 `/etc/kubernetes/pki`）

```bash
$ kubectl -n kubesphere-system create secret generic kubesphere-ca  \
--from-file=ca.crt=/etc/kubernetes/pki/ca.crt  \
--from-file=ca.key=/etc/kubernetes/pki/ca.key 
```

3. 创建 etcd 的证书 Secret。

> 注：根据集群实际 etcd 证书位置创建；

   - 若 etcd 已经配置过证书，则参考如下创建：

```
$ kubectl -n kubesphere-monitoring-system create secret generic kube-etcd-client-certs  \
--from-file=etcd-client-ca.crt=/etc/kubernetes/pki/etcd/ca.crt  \
--from-file=etcd-client.crt=/etc/kubernetes/pki/etcd/healthcheck-client.crt  \
--from-file=etcd-client.key=/etc/kubernetes/pki/etcd/healthcheck-client.key
```

- 若 etcd 没有配置证书，则创建空 Secret（以下命令适用于 Kubeadm 创建的 Kubernetes 集群环境）：

```
$ kubectl -n kubesphere-monitoring-system create secret generic kube-etcd-client-certs
```

4. 克隆 kubesphere-installer 仓库至本地。

```
$ git clone https://github.com/kubesphere/ks-installer.git
```

5. 进入 ks-installer，然后在 Kubernetes 集群部署 KubeSphere。


```
$ cd deploy

$ vim kubesphere.yaml   # 根据下方的参数说明列表，编辑 kubesphere.yaml 中 kubesphere-config 为当前集群参数信息。（若etcd 无证书，设置 etcd_tls_enable: False）

$ kubectl apply -f kubesphere.yaml
```

6. 查看部署日志。

```
$ kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l job-name=kubesphere-installer -o jsonpath='{.items[0].metadata.name}') -f
```

7. 查看控制台的服务端口，使用 `IP:30880` 访问 KubeSphere UI 界面，默认的集群管理员账号为 `admin/P@88w0rd`。

```
$ kubectl get svc -n kubesphere-system    
# 查看 ks-console 服务的端口  默认为 NodePort: 30880
```

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190930171519.png)

## 参数说明

安装前可对部分组件进行可选安装，可参考 [参数说明](https://github.com/kubesphere/ks-installer/blob/master/README_zh.md#%E5%8F%82%E6%95%B0%E8%AF%B4%E6%98%8E)。

## 未来计划

- 支持多个公有云的网络插件与存储插件；
- 组件解耦，做成可插拔式的设计，使安装更轻量，资源消耗率更低。