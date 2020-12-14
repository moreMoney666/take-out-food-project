<template>
	<div>
	  <div class="one"></div>
	  <div class="two">美团外卖送啥都快</div>
	  <div class="three"></div>
	  <div class="two">美团外卖越吃越帅</div>
	  <div class="three" style="background-image: url(images/04.jpg)"></div>
	  <div class="two">外卖！就点美团！</div>
	  <div class="three" style="background-image: url(images/05.jpg)"></div>
	</div>
  </template>
  
  <script>
  export default {
	name: "Home",
  };
  </script>
  
  <style lang='less' scoped>
  * {
	margin: 0;
	padding: 0;
  }
  body {
	height: 800px;
  }
  .one {
	height: 956px;
	background: url(images/01.png) no-repeat center 0;
  }
  .two {
	height: 321px;
	background: url(images/06.png) no-repeat center 0;
	font-size: 50px;
	text-align: center;
	line-height: 321px;
	font-variant: small-caps;
	font-family: "Arial", "Microsoft YaHei", "黑体", "宋体", sans-serif;
  }
  .three {
	height: 600px;
	background: url(images/03.jpg) no-repeat center top;
	background-size: cover;
	background-attachment: fixed;
  }
  
  </style>
  