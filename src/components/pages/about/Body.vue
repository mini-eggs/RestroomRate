<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            What went into making the web app + others
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <div class="card">
                        <h1>Hi!</h1>
                        <br/>
                        <h4>
                            Well, what good is a web app for something such as Restroom Rate? Nothing! Well, close. This is operating as a web client, yes--but the main
                            reason for the creation of this was to create a fully fleshed out ReST API for use with the app: Restroom Rate. This is just another fun token for users
                            to play with.
                        </h4>
                        <br/>
                        <h1>Wait, one more time--why?</h1>
                        <h4>I prefer making APIs concurrently with web apps instead of native apps, that is all.</h4>
                        <br/>
                        <h1>How was it made?</h1>
                        <h4>
                            This was made with NodeJS/Express on the server with VueJS 2.0 as the model-view-viewmodal.
                            (What is that? <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel" target="_blank">Knock yourself out.</a>)
                        </h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="stylus">
</style>
<script>
    export default{
        data(){
            return{
            }
        },
        components:{
        }
    }
</script>
