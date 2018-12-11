##  Multi-Node Mode

`Multi-Node` mode means install KubeSphere on multiple instances. Typically, select any one host in the cluster being served as a role of "`taskbox`" to execute installation task for other hosts before multi-node installation,  "`SSH Communication`" is required to be established between "taskbox" and other hosts.

### Prerequisites

- Please download <a href="https://kubesphere.io/download/" target="_blank">KubeSphere Advanced Edition</a> to the target machine.
- It is recommended to use the storage services which are recommended by KubeSphere and prepare the corresponding storage server. If you are not prepare the storage server yet, you can also configure NFS-Server in Kubernetes as the default storage only for testing installation.

### Step 1: Provision Linux Host

The following section identifies the hardware specifications and system-level requirements of hosts for installation. To get started with multi-node mode, you may need to prepare at least `2` hosts refer to the following specification. For `ubuntu 16.04` OS, it's recommended to select the latest `16.04.5`.

#### Hardware Recommendations

| System | Minimum Requirements |  Recommendations |
| --- | --- | --- |
| CentOS 7.5 (64 bit) | CPU：4 Core <br/> Memory：8 G <br/> Disk Space：40 G | CPU：8 Core <br/> Memory：16 G <br/> Disk Space：500 G |
| Ubuntu 16.04/18.04 LTS (64 bit) | CPU：4 Core <br/> Memory：8 G <br/> Disk Space：40 G | CPU：8 Core <br/> Memory：16 G <br/> Disk Space：500 G |
| Red Hat Enterprise Linux Server 7.4 (64 bit) | CPU：4 Core <br/> Memory：8 G <br/> Disk Space：40 G | CPU：8 Core <br/> Memory：16 G <br/> Disk Space：500 G |


The following section describes an example to introduce multi-node mode installation. This example showing 3 hosts installation that "master" serves as the taskbox who is supposed to execute the installation. The KubeSphere cluster architecture consists of management nodes (Master) and working nodes (Node), the following cluster consists of one Master and two Nodes. In the underlying Kubernetes, the Worker nodes and the Master nodes all running a kubelet, but there are three system pods running on Master : kube-apiserver, kube-scheduler, and kube-controller-manager. Assume that the host information as following table showing:

> Note: The Advanced Edition supports the high-availability configuration of the Master and etcd nodes, but this example is only for testing installation, so only a single Master and a single etcd are deployed. The formal environment is recommended to configure the high-availability of the Master and etcd nodes, see [Highly-available configuration of Master and etcd node](https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/installation/master-ha/).

| Host IP | Host Name | Role |
| --- | --- | --- |
|192.168.0.1|master|master, etcd|
|192.168.0.2|node1|node|
|192.168.0.3|node2|node|



#### Cluster Architecture

**Single master, Single etcd, Single nodes**

![Architecture](/cluster-architecture.svg)


###  Step 2: Provision Installation Files


**1.**  Download <a href="https://kubesphere.io/download/" target="_blank">KubeSphere Installer</a>, suggest you to download installer via command like `curl -O url` or `wget url` with download link. When you get the installer, execute following command to unzip it. 

```bash
$ tar -zxf kubesphere-all-advanced-1.0.0.tar.gz
```

**2.** Go into “`kubesphere-all-advanced-1.0.0`” folder

```bash
$ cd kubesphere-all-advanced-1.0.0
```

**3.** In order to manage deployment process and target machines configuration, please refer to the following scripts to configure all hosts in `hosts.ini`. It's recommneded to install using `root` user, here showing an example configuration in `CentOS 7.5` using `root` user. Note that each host information occupies one line and cannot be wrapped manually.

> Note:
> - If installer is ran from non-root user account who has sudo privilege already, then you are supposed to reference the example section that is commented out in `conf/hosts.ini`.
> - If the `root` user cannot be ssh connected to other machines in taskbox, you need to refer to the `non-root` user example section in the `conf/hosts.ini` as well, but it's recommended to switch to the `root` user when executing `install.sh`. If you are still confused about this, see the [FAQ - Question 2](https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/faq/).

**hosts.ini**

```ini
[all]
master ansible_connection=local  ip=192.168.0.1
node1  ansible_host=192.168.0.2  ip=192.168.0.2  ansible_ssh_pass=PASSWORD
node2  ansible_host=192.168.0.3  ip=192.168.0.3  ansible_ssh_pass=PASSWORD

[kube-master]
master

[kube-node]
node1
node2

[etcd]
master

[k8s-cluster:children]
kube-node
kube-master
```

**Note：** <br/>

> - Each node's parameters like Internal IP and its password needs to be modified into `[all]` field. In this example, since "master" served as `taskbox` which has been ssh connected from your local, just needs to replace "ip" with your current "ip".
> - Other nodes like "node1" and "node2", both "ansible_host" and "ip" needs to be replaced by their actual Internal IP, and "ansible_ssh_pass" should be replaced with the ssh password in `[all]` field.
> - "master" is served as the taskbox which is to execute installation task for whole cluster, as well as the role of master and etcd, so "master" needs to be filled into `[kube-master]` and `[etcd]` field.
> - At the same time, for "node1" and "node2", they serve the role of `Node` as well, so all of the hosts name need to be filled into `[kube-node]` field.
> 
> Parameters Specification:
> 
> - ansible_connection: Connection type to the host, set to local here means local connection.
> - ansible_host: The name of the host to be connected.
> - ip: The ip of the host to be connected.
> - ansible_user: The default ssh user name to use.
> - ansible_become_pass: Allows you to set the privilege escalation password.
> - ansible_ssh_pass: The password of the host to be connected using root.


**5.** It is recommended to use the storage services which are recommended by KubeSphere and prepare the corresponding storage server. If you are not prepare the storage server yet, you can also configure NFS-Server in Kubernetes as the default storage only for testing installation. If so, you may need to modify the storage class parameters in  `vars.yml` refer to the example below. For details please reference the <a href="https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/installation/storage-configuration/" target="_blank">Storage Configuration Instructions</a>.

 
**Note：**  <br/>

> - You may need to modify the relevant configurations like network or storage class in `conf/vars.yaml`, otherwise it will be executed with default parameters without any modifications.
> - Network：KubeSphere supports `calico` by default.
> - Supported Storage Classes：[QingCloud Block Storage](https://www.qingcloud.com/products/volume/)、[QingStor NeonSAN](https://docs.qingcloud.com/product/storage/volume/super_high_performance_shared_volume/)、[GlusterFS](https://www.gluster.org/)、[CephRBD](https://ceph.com/)、[NFS](https://kubernetes.io/docs/concepts/storage/volumes/#nfs)、[Local Volume](https://kubernetes.io/docs/concepts/storage/volumes/#local). For details regarding storage configuration, please refer to <a href="https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/installation/storage-configuration/" target="_blank">Storage Configuration Instructions</a>
> - Typically, you need to configure the persistent storage. Since multi-node mode does not support local storage, it's recommended to modify the local storage configuration to `false`, then configure persistent storage such as QingCloud-CSI, NeonSAN-CSI, GlusterFS or CephRBD. Following example describes how to configure NFS server in Kubernetes (`nfs_server_enable` and `nfs_server_is_default_class` needs to be set to true).
> - Since the default subnet for Cluster IPs is 10.233.0.0/18, default subnet for Pod IPs is 10.233.64.0/18 in Kubernetes cluster. The node IPs must not overlap with those 2 default IPs. If any conflicts happened with the IP address, go to `conf/vars.yaml` and modify `kube_service_addresses` or `kube_pods_subnet` to avoid this senario.


**Example** 

```yaml
# Local volume provisioner deployment(Only all-in-one)
local_volume_provisioner_enabled: false
local_volume_provisioner_storage_class: local
local_volume_is_default_class: false

# NFS-Server provisioner deployment
nfs_server_enable: true
nfs_server_is_default_class: true
```


###  Step 3: Get Started With Deployment

The environment and file monitoring, dependent software installation of KubeSphere, automated installation of Kubernetes and etcd, and automated storage configuration, Kubernetes v1.12.3 will be installed by default. All of these procedures will be automatically processing in this installation. The KubeSphere installer will automatically install the relevant dependent software like Ansible (v2.4+)，Python-netaddr (v0.7.18+) and Jinja (v2.9+) as well.

Following steps describes how to get started with all-in-one:

> Since Multi-node installation duration is related to network conditions and bandwidth, machine configuration and the number of nodes, it's hard to give a standard duration. 

**1.** Go into `scripts`:

```bash
$ cd scripts
```

**2.** It's recommended to install using `root` user, then execute `install.sh`:

```bash
$ ./install.sh
```

**3.** Enter `2` to select `multi-node` mode to start, the installer will prompt if you have configured the storage or not. If not, please enter "no", then return to configure the storage, for details please reference <a href="https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/installation/storage-configuration/" target="_blank">Storage Configuration Instructions</a>.

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2018-12-08
################################################
Please input an option: 2

```

**4.** To verify KubeSphere multi-node installation：

**(1).**If you can see the following "Successful" result being returned after `install.sh` completed, that means KubuSphere installation is ready. You may need to bind the EIP and configure port forwarding. Make sure you have added the corresponding Nodeport to the firewall (like 32130) if the EIP has a firewall, then external network traffic can pass through this nodeport.

```bash
successsful!
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://192.168.0.1:32130
Account: admin
Password: passw0rd

NOTE：Please modify the default password after login.
#####################################################
```


> Note: If you need to view the above interface , just execute `cat kubesphere/kubesphere_running` command in the installer directory.

**(2).** You will be able to use default account and password to log in to the KubeSphere console to experience when KubeSphere is deployed successfully. It's highly recommended to refer to the <a href="https://docs.kubesphere.io/advanced-v1.0.0/zh-CN/quick-start/quick-start-guide/" target="_blank">KubeSphere Quick Start</a>， and learn how to get started with it！

![login](/login-page.png)
