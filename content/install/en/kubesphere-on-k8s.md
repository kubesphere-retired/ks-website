## Install KubeSphere on existing Kubernetes

In addition to supporting deploy on virtual machine and bare metal, KubeSphere also supports installing on cloud-hosted and on-prem Kubernetes cluster.

## Deploy On Kubernetes

### Prerequisites

> - `Kubernetes version`： `1.15.x, 1.16.x, 1.17.x`
> - `Helm version` >= `2.10.0`，see [Install and Configure Helm in Kubernetes](https://devopscube.com/install-configure-helm-kubernetes/);
> - An existing Storage Class in your Kubernetes cluster, use `kubectl get sc` to verify it.
> - Your cluster can connect to an external network.

### Installation

Install KubeSphere using kubectl.

- If there are 1 Core and 2 GB RAM available in your cluster, use the command below to trigger a default minimal installation only:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-minimal.yaml
```

- If there are 8 Cores and 16 GB RAM available in your cluster, use the command below to install a complete KubeSphere, i.e. with all components enabled:

```yaml
kubectl apply -f https://raw.githubusercontent.com/kubesphere/ks-installer/master/kubesphere-complete-setup.yaml
```

Verify the real-time logs. When you see the following outputs, congratulation! You can access KubeSphere console in your browser now.

```bash
$ kubectl logs -n kubesphere-system $(kubectl get pod -n kubesphere-system -l app=ks-install -o jsonpath='{.items[0].metadata.name}') -f

#####################################################
###              Welcome to KubeSphere!           ###
#####################################################
Console: http://10.128.0.34:30880
Account: admin
Password: P@88w0rd

NOTE：Please modify the default password after login.
#####################################################
```

### Enable Pluggable Components

If you start with a default minimal installation, execute the following command to open the configmap in order to enable more pluggable components at your will. Make sure your cluster has enough CPU and memory, see [Enable Pluggable Components](https://kubesphere.io/docs/v2.1/en/installation/pluggable-components/).

```bash
kubectl edit cm -n kubesphere-system ks-installer
```

### FAQ

If you have further questions please do not hesitate to raise issues on [GitHub](https://github.com/kubesphere/kubesphere/issues).
