<template>
    <div class="body">
        <div class="container-fluid ">
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <blockquote>
                        <p>
                            Please fill out the form below to begin
                        </p>
                    </blockquote>
                </div>
            </div>
            <div class="spacer"/>
            <div class="row">
                <div class="col-xs-12 col-sm-5 offset-sm-2">
                    <div class="card">
                        <h1>Name</h1>
                        <input placeholder="Example: Yoke's -- Spokane Valley, WA"/>
                        <div class="spacer"/>
                        <h1>Rate</h1>
                        <input placeholder="Enter number, 1-5"/>
                        <div class="spacer"/>
                        <h1>Description</h1>
                        <input placeholder="Talk about it"/>
                    </div>
                    <div class="spacer"/>
                </div>
                <div class="col-xs-12 col-sm-3">
                    <div class="card padding-0">
                        <label class="fileContainer">
                            <h1>Upload Photo</h1>
                            <input type="text" placeholder="Click here"/>
                            <input type="file"/>
                        </label>
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
