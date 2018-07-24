## Appendix

### **Disconnected Installation Instructions**  (To be defined)

To be defined


### **SSH Password-less Login Configuration Instructions**


Execute following commands orderly，go into  **`scripts`** ，then execute **`sendsshkey.py`** :
 
```
$ cd scripts
```  

```
$ ./sendsshkey.py
```
If returns  **"`id\_rsa.pub Does not exist!`"**  ,  please generate SSH key firstly ，then execute `sendsshkey.py` again.

**Generate SSH key ：**

```
$ ssh-keygen -t rsa -N ''
```
