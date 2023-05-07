<template>
    <v-snackbar
        v-model="snackbarBol" 
        :color="color"
        height="80px"
    >
    {{message}}
    <v-btn icon @click="snackbarBol=false">
        <v-icon>mdi-close</v-icon>
    </v-btn>
    
    </v-snackbar>
</template>
<script>
export default {
    props:{
        message: {
            type:String,
            default:"success"
        },
        color:{ 
            type: String,
            default: "success"
        },
        snackbar: {
            type: Boolean,
            default: true
            } 
    },
    data() {
        return {
           snackbarBol: true
        };
    },
   
}

</script>