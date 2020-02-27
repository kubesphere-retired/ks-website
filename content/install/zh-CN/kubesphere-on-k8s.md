## 在 Kubernetes 在线部署 KubeSphere

KubeSphere 除了支持部署在 Linux 之上，还支持在已有 Kubernetes 集群之上部署 [KubeSphere](https://kubesphere.io/)。

## 准备工作

KubeSphere 支持在已有 Kubernetes 集群之上在线安装 [KubeSphere](https://kubesphere.io/)。在安装之前，请确认您的环境满足以下前提条件：


> - `Kubernetes` 版本： `1.15.x、1.16.x、1.17.x`；
> - `Helm`版本： `2.10.0 ≤ Helm Version ＜ 3.0.0`（不支持 helm 2.16.0 [#6894](https://github.com/helm/helm/issues/6894)），且已安装了 Tiller，参考 [如何安装与配置 Helm](https://devopscube.com/install-configure-helm-kubernetes/) （预计 3.0 支持 Helm v3）；
> - 集群已有默认的存储类型（StorageClass），若还没有准备存储请参考 [安装 OpenEBS 创建 LocalPV 存储类型](https://kubesphere.com.cn/docs/v2.1/zh-CN/appendix/install-openebs/) 用作开发测试环境。
> - 集群能够访问外网（离线安装将在 3 月初提供）。

可参考 [前提条件](https://kubesphere.io/docs/v2.1/zh-CN/installation/prerequisites/) 验证，若待安装的环境满足以上条件则可以开始部署 KubeSphere。

## 最小化安装 KubeSphere

- 若您的集群可用的资源符合 CPU > 1 Core，可用内存 > 2 G，可以参考以下命令开启 KubeSphere 最小化安装：

```yaml
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-minimal.yaml
```

- 若您的集群可用的资源符合 CPU ≥ 8 Core，可用内存 ≥ 16 G，建议参考以下命令开启 KubeSphere 完整安装，即开启所有功能组件的安装：

```yaml
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-complete-setup.yaml
```

2. 查看安装日志，请耐心等待安装成功。

```bash
$ kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f
```

3. 通过 `kubectl get pod --all-namespace` 查看 kubesphere 的 namespace 下所有 Pod 状态是否为 Running。确认 Pod 都正常运行后，可使用 `IP:30880` 访问 KubeSphere ConSole 界面，默认的集群管理员账号为 `admin / P@88w0rd`。

![](https://pek3b.qingstor.com/kubesphere-docs/png/20191020153911.png)


若遇到其它的安装问题需要协助支持，请在 [社区论坛](https://kubesphere.com.cn/forum/) 搜索解决方法或发布帖子，我们会尽快跟踪解决。
