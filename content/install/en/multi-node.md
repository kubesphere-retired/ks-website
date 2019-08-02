## Multi-Node Mode

`Multi-Node` is used to install KubeSphere on multiple instances. Typically, select any one host in the cluster being served as a role of "`taskbox`" to execute installation task, "`SSH Communication`" is required to be established between "taskbox" and other hosts.

## Installation Demo

<asciinema-player src="/multi-node.json" cols="99" rows="41"></asciinema-player>

## Prerequisites 

- It is recommended to use the persistent storage services which are recommended by KubeSphere and prepare the corresponding storage server. The following procedure uses [QingCloud-CSI block storage plugin](https://www.qingcloud.com/products/volume/) as an example，suppose you have [QingCloud Console](https://console.qingcloud.com/login) account.
- <font color=red>Note that if using QingCloud block storage as the persistent storage service, you need to make sure the resource quota of your account meets the minimum requirements in the current Zone before installation. A minimum of 14 disks are required for multi-node installation. For this example, high capacity disk are used by default. The minimum quota of high capacity disk is set to 1400 GB, if the quantity and capacity quota of hard disk is not enough, please submit ticket to apply for higher quota.</font>

### Step 1: Provision Linux Host

The following section identifies the hardware specifications and system-level requirements of hosts for installation. To get started with multi-node mode, you need to prepare at least `3` hosts refer to the following specification. 

- For `ubuntu 16.04` OS, it's recommended to select the latest `16.04.5`.
- If you are using ubuntu 18.04, you need to use root.
- If the Debian system does not have the sudo command installed, you need to execute the `apt update && apt install sudo` command using root before installation.

#### Hardware Recommendations

| System  | Minimum Requirements | 
| ------- | ----------- | 
| CentOS 7.5 (64 bit)         | CPU：8 Core +,  Memory：16 G +, Disk Space：40 G + | 
| Ubuntu 16.04/18.04 LTS (64 bit)   | CPU：8 Core +,  Memory：16 G +, Disk Space：40 G + | 
| Red Hat Enterprise Linux Server 7.4 (64 bit) | CPU：8 Core +,  Memory：16 G +, Disk Space：40 G + |  
|Debian Stretch 9.5 (64 bit)| CPU：8 Core +,  Memory：16 G +, Disk Space：40 G + | 

The following procedure walks you through setting up a 3-node cluster, the host name of "master" serves as the taskbox to execute the installation. The KubeSphere cluster architecture consists of management nodes (Master) and working nodes (Node), thus this cluster consists of one Master and two Node. Assume that the host information as following table showing:

> Note: The Advanced Edition supports the high-availability configuration of the Master and etcd nodes, for convenience this example is only for testing installation, so only a single Master and a single etcd will be deployed. The formal environment is recommended to configure the high-availability of the Master and etcd nodes, see [Highly-available configuration of Master and etcd node](/docs/advanced-v1.0/zh-CN/installation/master-ha/).

| Host IP     | Host Name | Roles        |
| ----------- | --------- | ------------ |
| 192.168.0.1 | master    | master       |
| 192.168.0.2 | node1     | node         |
| 192.168.0.3 | node2     | node         |

#### Cluster Architecture

**Single master, Single etcd, Single nodes**

![Architecture](/cluster-architecture.svg)

## Step 2: Provision Installation Files

<div class="md-tabs">
<input type="radio" name="tabs" id="stable" checked="checked">
<label for="stable">Online Installer (2.0.2)</label>
<span class="md-tab">

**1.** Download `KubeSphere Advanced Edition 2.0.2` and enter into the configuration folder.

```bash
$ curl -L https://kubesphere.io/download/stable/advanced-2.0.2 > advanced-2.0.2.tar.gz \
&& tar -zxf advanced-2.0.2.tar.gz && cd kubesphere-all-advanced-2.0.2/conf
```
 
</span>
<input type="radio" name="tabs" id="offline">
<label for="offline">Offline Installer (2.0.2)</label>
<span class="md-tab">

**1.** Download `KubeSphere Advanced Edition 2.0.2` and enter into the configuration folder.

```bash
$ curl -L https://kubesphere.io/download/offline/advanced-2.0.2 > advanced-2.0.2.tar.gz && tar -zxf advanced-2.0.2.tar.gz && cd kubesphere-all-offline-advanced-2.0.2/scripts
```

</span>
</div>

**2.** Please refer to the following scripts to configure all hosts in `hosts.ini`. It's recommneded to install using `root` user, here showing an example configuration in `CentOS 7.5` using `root` user. Note that each host information occupies one line and cannot be wrapped manually.

> Note:
>
> - If installer is ran from non-root user account who has sudo privilege already, then you are supposed to reference the example section that is commented out in `conf/hosts.ini`.
> - If the `root` user cannot be ssh connected to other machines in taskbox, you need to refer to the `non-root` user example section in the `conf/hosts.ini` as well, but it's recommended to switch to the `root` user when executing `install.sh`. 
> - Master, node1 and node2 are the host names of each node and all host names should be in lowercase.

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

> - `[all]`: Each node's parameters like Internal IP and password needs to be modified in `[all]` field. In this example, since "master" served as `taskbox` which has been ssh connected from your local, just needs to replace "ip" with your current "ip". Other nodes like "node1" and "node2", both `"ansible_host"` and "ip" needs to be replaced by their actual Internal IP, and `"ansible_ssh_pass"` should be replaced with the ssh password in `[all]` field.
> Parameters Specification:
>
>    - `ansible_connection`: Connection type to the host, set to local here means local connection.
>    - `ansible_host`: The name of the host to be connected.
>    - `ip`: The ip of the host to be connected.
>    - `ansible_user`: The default ssh user name to use.
>    - `ansible_become_pass`: Allows you to set the privilege escalation password.
>    - `ansible_ssh_pass`: The password of the host to be connected using root.
> - `[kube-master]` and `[etcd]`: "master" is served as the taskbox which is to execute installation task for whole cluster, as well as the role of master and etcd, so "master" needs to be filled into `[kube-master]` and `[etcd]` field.
> - `[kube-node]`: At the same time, for "node1" and "node2", they serve the role of `Node` so both need to be filled into `[kube-node]` field as well. 



**3.** Edit the `conf/vars.yml`, for example, to configure QingCloud-CSI plugin to connect QingCloud block storage.

> Note：
> - Where a value with `*` is required, refer to [Storage Configuration Instruction](/docs/advanced-v2.0/zh-CN/installation/storage-configuration).
>    - `qingcloud_access_key_id` and `qingcloud_secret_access_key`： Log in to [QingCloud Console](https://console.qingcloud.com/login), select **API key** to create the key and download it (Only the values within single quotation marks should be pasted when filling in)；
>    - `qingcloud_zone`：Fill in according to your machine is in，i.e. sh1a（ShangHai 1-A）、sh1b（ShangHai 1-B）、 pek2（Beijing 2）、pek3a（Beijing 3-A）、gd1（Guangdong 1）、gd2a（Guangdong 2-A）、ap1（Asia-pacific -1）、ap2a（Asia-pacific 2-A）;
>    - `qingcloud_csi_enabled`：Determines whether to use qingcloud-csi used as persistent storage，change it to true;
>    - `qingcloud_csi_is_default_class`：Determines whether to set QingCloud-CSI as default storage class, change it to true;
> - The last six lines without `*` are optional so there is no need to change them in the example. Defaults to high capacity disk and its type is 2(Can be mounted to any type of host).<br> <font color=red>Note that the resource quota of your account should meet the minimum requirements in the current Zone before installation</font> If you need to use other types of disk, also need to meet the minimum quota, refer to [Storage Configuration Instruction - QingCloud CSI](/docs/advanced-v2.0/zh-CN/installation/storage-configuration)。


**vars.yml Configuration Example**

```yaml
# Access key pair can be created in QingCloud console
qingcloud_access_key_id: * Input your QingCloud key id *
qingcloud_secret_access_key: * Input your QingCloud access key *
# Zone should be the same as Kubernetes cluster
qingcloud_zone: * Input your Zone ID (e.g. pek3a, gd2) *
···

# QingCloud CSI
qingcloud_csi_enabled: * true *
qingcloud_csi_is_default_class: * true *
qingcloud_type: 2
qingcloud_maxSize: 5000
qingcloud_minSize: 100
qingcloud_stepSize: 50
qingcloud_fsType: ext4
qingcloud_disk_replica: 2
```

> - You need to modify the relevant configurations like network or storage class in `conf/vars.yaml`, otherwise it will be executed with default parameters without any modifications.
> - Network：KubeSphere supports `calico` by default.
> - Supported Storage Classes：[QingCloud Block Storage](https://www.qingcloud.com/products/volume/)、[QingStor NeonSAN](https://docs.qingcloud.com/product/storage/volume/super_high_performance_shared_volume/)、[GlusterFS](https://www.gluster.org/)、[CephRBD](https://ceph.com/)、[NFS](https://kubernetes.io/docs/concepts/storage/volumes/#nfs)、[Local Volume](https://kubernetes.io/docs/concepts/storage/volumes/#local). For details regarding storage configuration, please refer to [Storage Configuration Instructions](/docs/advanced-v1.0/zh-CN/installation/storage-configuration/)
> - Since the default subnet for Cluster IPs is 10.233.0.0/18, default subnet for Pod IPs is 10.233.64.0/18 in Kubernetes cluster. The node IPs must not overlap with those 2 default IPs. If any conflicts happened with the IP address, go to `conf/vars.yaml` and modify `kube_service_addresses` or `kube_pods_subnet` to avoid this senario.

### Step 3: Get Started With Installation

All of these procedures will be automatically processing in this installation, such as the environment and file monitoring, installation of Kubernetes and etcd, and storage and network configuration, Kubernetes v1.13.5 will be installed by default. 

> Since Multi-node installation duration is related to network conditions and bandwidth, machine configuration and the number of nodes, it's hard to give a standard duration.

**1.** Enter into scripts folder, it's recommended to execute `install.sh` using `root` user:

```bash
$ cd scripts
```bash
$ ./install.sh
```

**2.** Enter `2` to select `multi-node` mode to trigger, the installer will prompt if you have configured the storage or not. If already set please type yes to install.

```bash
################################################
         KubeSphere Installer Menu
################################################
*   1) All-in-one
*   2) Multi-node
*   3) Quit
################################################
https://kubesphere.io/               2018-07-08
################################################
Please input an option: 1
```

**3.** Verify if all-in-one mode is installed successfully：

**(1).** If you can see the following "Successful" result being returned after `install.sh` completed, that's successful. You may need to bind the EIP and configure port forwarding. Make sure you have added the console nodeport (30880) to the firewall if the EIP has a firewall, then external network traffic can pass through this nodeport.

```bash
successsful!
#####################################################
###              Welcome to KubeSphere!           ###
#####################################################

Console: http://192.168.0.8:30880
Account: admin
Password: P@88w0rd 

NOTE：Please modify the default password after login.
#####################################################
```

> Note: If you need to view the above interface, just execute `cat kubesphere/kubesphere_running` command in the installer directory.

**(2).** You will be able to use default account and password to log in to the KubeSphere console to experience the features, it also has an English version UI. It's highly recommended to refer to the [KubeSphere Quick Start](/docs/advanced-v2.0/zh-CN/quick-start/quick-start-guide/)， and learn how to get started with it！


![login](/login-page-en.png)

<font color=red>Note: After log in to console, please verify the monitoring status of service components in the "Cluster Status". If the service is not ready, please wait patiently. You can start to use when all components are totally ready.</font>

![](https://pek3b.qingstor.com/kubesphere-docs/png/20190519013158.png)