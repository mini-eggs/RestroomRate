<template>
  <div id="app">
    <header-comp/>
    <router-view></router-view>
    <user-message/>
  </div>
</template>
<style lang="stylus">
  * {
    -webkit-transition: all 250ms ease-out 250ms;
    -moz-transition: all 250ms ease-out 250ms;
    -o-transition: all 250ms ease-out 250ms;
    transition: all 250ms ease-out 250ms;
  }
  body {
    min-height:100.1vh;
  }
  label, .card {
    margin:0;
  }
  .fileContainer {
    overflow: hidden;
    position: relative;
    cursor:pointer;
    width: 100%;
  }
  .fileContainer [type=file] {
    cursor: inherit;
    display: block;
    font-size: 999px;
    min-height: 100%;
    min-width: 100%;
    opacity: 0;
    position: absolute;
    right: 0;
    text-align: right;
    top: 0;
    padding:50px;
  }
  .fileContainer h1 {
    padding:50px 50px 0px 50px;
  }
  .fileContainer input[type=text] {
    padding:0px 50px 50px 50px;
  }
  blockquote {
    border-left: 10px solid #ccc;
    padding:25px;
  }
  blockquote p {
    display: inline;
    font-size:24px;
  }
  .body {
    background-color:#f6f6f6;
    padding:50px 0;
  }
  .body .card{
    color:#000;
    border-width:0;
    padding:50px;
  }
  .body .card.padding-0{
    padding:0;
  }
  h1, h2, h3, h4, h5, h6 {
    margin:0;
  }
  .spacer {
    width:100%; height:25px;
  }
  input, input:focus, input:active, input:visited, input:hover {
    outline:none!important;
  }
  .body input {
    border-width:0px;
    font-size:22px;
    width:100%;
  }
  .body input[type="file"] {

  }
</style>
<script>
  import headerComponent from './components/shared/Header.vue';
  import UserMessage from './components/shared/UserMessage.vue';
  export default {
    data:function(){
      return {};
    },
    components:{
      'header-comp':headerComponent,
      'user-message':UserMessage
    },
    mounted:function(){
    }
  }
</script>