Source Code in action (interactive)

http://meteorpad.com/pad/yGjuFQjiq3mYd248o/Residence-Manager

Getting this up and running on your computer
============================

Requirements: 
- Node.js 0.10.29 or newer
- A Mac or Linux machine (needs to be Unix)
- Meteor

To get Node.js:

http://www.nodejs.org

To get Meteor:

```bash
$ curl https://install.meteor.com/ | sh
```

Now, clone or download a .zip of this entire project.

Unfortuantely, you'll have to create a new Meteor project, and then copy the files into that project for this to work. This is super annoying. Run these bash commands from **the top of the cloned directory**:

```bash
$ meteor create residence-manager-test
$ cd residence-manager-test
$ rm residence-manager-test.html residence-manager-test.css residence-manager-test.js
$ cd ..
$ cp residence-manager/. residence-manager-test/ -R
$ cd residence-manager-test && meteor
```
```
