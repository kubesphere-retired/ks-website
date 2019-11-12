## Install KubeSphere on existing Kubernetes

In addition to supporting deploy on VM and BM, KubeSphere also supports installing on cloud-hosted and on-premises Kubernetes clusters,

> Attention: Following section is only used for minimal installation by default, KubeSphere has decoupled some core components in v2.1.0, for more pluggable components installation, see `Enable Pluggable Components` below.

## Deploy On Kubernetes

### Prerequisites**

> - `Kubernetes version`： `1.13.0 ≤ K8s version < 1.16`;
> - `Helm version` >= `2.10.0`，see [Install and Configure Helm in Kubernetes](https://devopscube.com/install-configure-helm-kubernetes/);
> - CPU > 1 Core，Memory > 2 G;
> - An existing Storage Class in your Kubernetes clusters, use `kubectl get sc` to verify it.

When all Pods of KubeSphere are running, it means the installation is successsful. Then you can use `http://IP:30880` to access the dashboard with default account `admin/P@88w0rd`.

```yaml
$ kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-minimal.yaml
```


## Enable Pluggable Components

The above installation is only used for minimal installation by default, execute following command to enable more pluggable components installation, make sure your cluster has enough CPU and memory in advance.

> Attention: For enabling DevOps and etcd monitoring installation, you have to create CA and etcd certificates in advance, see [ks-installer](https://github.com/kubesphere/ks-installer/blob/master/README.md) for complete guide.

```
$ kubectl edit cm -n kubesphere-system ks-installer
```


## Configuration Table

Some components can be optional before installation, please refer to [Parameter Configuration](https://github.com/kubesphere/ks-installer/blob/master/README.md).
