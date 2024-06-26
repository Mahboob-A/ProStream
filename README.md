                         
<br/>
<div align="center">
<a href="https://prostream-gamma.vercel.app/">
<img src="https://github.com/Mahboob-A/ProStream/assets/109282492/7aec5083-43b1-4281-a578-3531ab10393b" alt="Logo" width="700" height="400">
</a>
<h3 align="center">Game Stream Win - Join the Pros on <a href="https://prostream-gamma.vercel.app/"><strong>ProStream</strong></a></h3>
<p align="center">
ProStream is a low latency video streaming platform just like <a href="https://www.twitch.tv/"><strong>Twitch</strong></a>
<br/>
<br/>
<a href="https://prostream-gamma.vercel.app/"><strong>Explore ProStream »</strong></a>
<br/>
<br/>
</p>
</div>

<h3 align="center">General Information</h3>

**ProStream** is a _**low latency**_ video streaming platform just like <a href="https://www.twitch.tv/">_Twitch_</a>. Streamer can share and stream their content, collect **tips** from their fans and **withdraw the money** into their bank account. A viewer can watch any live stream and they can **recharge their wallet** to **tip**  their favorite streamers. 

**ProStream** is built as a team of `three members`. The backend of **ProStream** is built on `Django` and the client app is built using `React`.  


<details>
<summary><h3 align="center">Deployment</h3></summary>

#### Deployment Information 

<a href="https://github.com/Mahboob-A/ProStream/tree/main/ProStream">ProStream Django Backend APIs</a> is deployed on `AWS EC2` in Ubuntu 22.04 server.  <br/>

<a href="https://github.com/Mahboob-A/ProStream/tree/main/pro-stream-client">ProStream React Client</a> is deployed on _Vercel_. 

The DNS for the `ProStream` platform domain for APIs  is hosted on `Route53`.   

</details>

<details>
<summary><h3 align="center">Features</h3></summary>

#### Features of ProStream

##### A. Authentication 

* The authentication system of ProStream is built from scratch. No `3rd party` packages has been used. 

* Users can request `OTP` while login if they have `forgotten their password` to access ProStream. 

*  Set new password using `OTP` if password is forgotten. 


##### B. Streamer 


* A regular user can register as a streamer. After registration, the `user` can live stream their content after registering as a `streamer`. 

* `Non-verified` streamers can only stream their content, in order to `accept tips from viewers`, they have to start an account `verification` process. 

* The account verification is approved upon successful documentation verification uploaded by the streamer. 

* Once approved, The streamer start earning money `accepting tips from viewers`. 

* ProStream takes`22%` commission from the earnings of the streamer, and the rest of the money could be withdrawn to the bank account of the streamer. 

* Streamer can send a `customize message` to the `email` of the `biggest tipper` of the streamer as an `appreciation gesture`.  

* The streamer should follow the ProStream `rules and policies.  

* The streamer is subject to be banned from ProStream platform after repeatedly violating the `terms and conditions` of live streaming in ProStream platform. 


##### C. Viewer 

* Any user can register in the ProStream platform and start watching their favorite streamer's contents. 

* User can recharge their wallet to tip to support their favorite streamer.

* Wallet money from user's account can not be withdrawn to their bank account. 

* Viewer can `follow/unfollow` a `streamer` or a `category`. 

##### D. Stream


* While starting a live stream, the streamer has to declare any potential _brand promotion content_, _recorded content_ they want to stream. 

* The streamer should flag is the stream is an _age restricted content_ or _not meant for general viewership_ such as `extreme activities`, `dark content` etc. 

* Any live stream `could be reported` by the viewers to the authority of ProStream for potential violation of `terms of conditions` of ProStream. 

* Stream can be scheduled. 

* Stream goes live under a category. 

##### E. Team 

* Streamers can form a `team` and work together as a content creators. 


##### F. ProStream Administration 

* ProStream administration has authority to manage ProStream without any discretion. 

 > ProStream administration are subject to perform the following duties 

>> Document Verification 

>> Payment Processing 

>> Reported Content Analysis 

>> Warn/Ban Streamer for t/c violation of ProStream



</details>

<details>
<summary><h3 align="center">Tech Stack of ProStream</h3></summary>

#### Tech Stack 

ProStream is built using the below tech-stacks. 
 
    a. Django as backend. 
    b. Django Rest Framework for API 
    c. PostgreSQL for database.
    d. AWS S3 to store static and mediafiles. 
    e. Agora to process streaming.
    f. SSLCommerz for payment gateway. 
    g. AWS EC2 Ubuntu 22.04 server to host the Django backend APIs.  
    h. Vercel to host the React client app. 

</details>
<details>
<summary><h3 align="center">Watch in Action</h3></summary>

#### A. Long Video (Describes all the features)

<a href="https://www.youtube.com/watch?v=z5IY4pMIIQM" target="_blank">
  <img src="https://img.youtube.com/vi/z5IY4pMIIQM/0.jpg" alt="Watch the video">
</a>

#### B. Short Video (Only core features) 

<a href="https://www.youtube.com/watch?v=TCOQNh2Kd-E" target="_blank">
  <img src="https://img.youtube.com/vi/TCOQNh2Kd-E/0.jpg" alt="Watch the video">
</a>

</details>

<details>
<summary><h3 align="center">Challenges and Learnings</h3></summary>

#### Challenges 

* ProStream is a team project. The first challenge we faced as a team was to communicate with the team members for a smooth workflow. We were a diverse team. As I, <a href="https://github.com/Mahboob-A">Mahboob Alam</a>, am from India, and the other two members  <a href="https://github.com/ab-atiq">Abul Bashar Atiq</a> and <a href="https://github.com/AlSaimun">Abdullah Al Saimun</a> of ProStream  was from Bangladesh. 

* While building an application like ProStream, we struggled in `database design`. We have researched and built `PoC` of database design before integrating it into the ProStream platform. 

 
#### Learning 

##### My (<a href="https://github.com/Mahboob-A">Mahboob Alam</a>) Learning 

* I have learnt to communicate with diverse team a remote software developer. 

* I had the opportunity to manage and maintain the the project from `dev-to-production`, I have gathered valuable understanding how to ship `bug-free` software. 

* I had the opportunity to deploy the project in `AWS EC2 Ubuntu 22.04` server. While doing so, I have gained practical understanding of provisioning and deploying a project to a `Cloud VPC`. 

* I was responsible to `API design` and  `database design`, I have learnt best practices of database design,  `UML Diagram`,  `ERD Diagram`. 


##### Learning as a Team 

* The SDLC of the project taught us how we as a team can research, plan,  and choose the right and best suited option to integrate to a project without re-inventing the wheel for faster software delivery. 

* We as a team learnt how a team-play works and how as a team we can collaborate to bring better result. 
 
* As a team, we have learnt from each others experiences and valuable inputs during the meetings. 
  
* We used Jira to manage our tasks. We were not limited to met only during stand-up meetings, we were prompt to meet if there was an emergency during the development or production of ProStream. 


</details>
<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://aws.amazon.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" alt="aws" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer"> <img src="https://cdn.worldvectorlogo.com/logos/django.svg" alt="django" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/> </a> <a href="https://heroku.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/heroku/heroku-icon.svg" alt="heroku" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.linux.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linux/linux-original.svg" alt="linux" width="40" height="40"/> </a> <a href="https://www.nginx.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nginx/nginx-original.svg" alt="nginx" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.postgresql.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original-wordmark.svg" alt="postgresql" width="40" height="40"/> </a> <a href="https://postman.com" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" alt="postman" width="40" height="40"/> </a> <a href="https://www.python.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="python" width="40" height="40"/> </a> <a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="40" height="40"/> </a> <a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a> <a href="https://tailwindcss.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg" alt="tailwind" width="40" height="40"/> </a> </p>

<h3 align="left">Connect with me:</h3>
<p align="left">
<a href="https://twitter.com/imahboob_a" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="imahboob_a" height="30" width="40" /></a>
<a href="https://linkedin.com/in/i-mahboob-alam" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="i-mahboob" height="30" width="40" /></a>
<a href="https://hashnode.com/@imehboob" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/hashnode.svg" alt="@imehboob" height="30" width="40" /></a>
<a href="https://medium.com/@imehboob" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/medium.svg" alt="@imehboob" height="30" width="40" /></a>
<a href="https://www.leetcode.com/mahboob-alam" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/leet-code.svg" alt="mahboob-alam" height="30" width="40" /></a>
</p>
