<template>
   <b-container class="pt-4 d-flex flex-column justify-content-center flex-grow-1" fluid>
     <b-row>
      <b-col class="mb-3 d-flex justify-content-center align-items-start flex-column" cols="6">
        <h1 class="mb-3">
          <span class="text-primary"> Super </span>
          <span class="text-warning"> Mega </span>
          <span class="text-info"> Game </span>
          <span class="text-danger"> Catalog </span>
        </h1>

        <b-btn variant="primary" to="/catalog" class="rounded-pill" size="lg">
          Open catalog
        </b-btn>
      </b-col>
       
       <b-col cols="12" lg="6">
         <img class="w-100" src="@/assets/images/hero-1.png" alt="">
       </b-col>
     </b-row>
     
   </b-container>
</template>

<script>
export default {
  name: 'Home',
}
</script>
