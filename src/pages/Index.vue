<template>
  <q-page class="vertical-top">
    <q-scroll-area :visible="visible" style="height:300px;width:300px;">
      <p>This is line 1</p>
      <q-btn color="Primary" @click="test2" label="primary" /><br />
      <p v-html="message"></p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo, voluptatibus doloremque, vel rem eos veritatis cupiditate voluptatum magnam quisquam animi necessitatibus dicta enim suscipit qui ipsa. Incidunt, molestias? Voluptas!</p>
      <p>Odit similique natus possimus non accusamus excepturi incidunt sint aperiam aspernatur saepe error aliquam voluptatibus, omnis dolor ipsam odio, tempora assumenda quam placeat suscipit. Sit corrupti est earum excepturi repellat!</p>
      <p>Consequatur rerum debitis iure, aliquid neque earum! Quasi aliquid consectetur facere labore debitis autem perspiciatis excepturi? Alias unde dicta nam perferendis numquam. Reiciendis cumque doloribus nisi officia unde asperiores saepe?</p>
      <p>Animi, recusandae cumque? Quam iste recusandae nam fuga exercitationem a quas corrupti, pariatur voluptas veniam consequuntur hic reprehenderit quaerat iusto quo. Fugiat perferendis nisi iure atque sint id culpa eum!</p>
      <p>Asperiores, eveniet assumenda voluptatum dolorem tempore porro eos optio dolore aspernatur laborum rerum possimus placeat iste reprehenderit dicta fugit rem. Aspernatur eum doloremque harum, nulla ipsa accusamus ut amet aperiam?</p>
      <p>Dolorem iusto eius vero ullam ab praesentium debitis in eligendi natus a eveniet inventore quisquam voluptatum asperiores fugiat itaque architecto, accusamus doloribus alias quis! Consequuntur quis error est facere repudiandae?</p>
      <p>Animi distinctio corrupti deserunt consequatur recusandae, doloribus ipsam non quidem saepe iste consequuntur sit. Laudantium, hic. Ipsum mollitia nostrum, nulla est maiores sit aut fugiat eaque incidunt quod consequatur cum!</p>
      <p>Adipisci, neque harum. Quae, dolorum quasi iure assumenda ratione sit, rem corporis et molestias, temporibus facere commodi. Vero voluptas officiis quod! Error quia eum voluptatem repellat odit quidem possimus sunt.</p>
      <p>Ad nobis deleniti perspiciatis dolorum. Dolores assumenda aut illo odio, nulla voluptate distinctio? Hic ullam veritatis eaque nihil rem aliquid voluptates, odit fugit ut enim magni deserunt sunt. Molestiae, dolores?</p>
      <p>Nisi sed porro et nostrum ad tempora voluptas at pariatur, nemo quisquam, eveniet nam suscipit libero modi corporis asperiores. Sequi aut dolores corrupti cumque quae et sed tempora blanditiis placeat.</p>
      <p>Adipisci voluptatibus fuga voluptates ratione, laudantium aliquid quibusdam dignissimos eligendi, cupiditate nesciunt neque ex aspernatur quisquam. Nostrum, error a? Aliquid quibusdam, porro dolor quod velit accusantium aperiam nesciunt temporibus ipsam.</p>
      <p>Maxime magni expedita necessitatibus, quis, sapiente totam deleniti enim nemo recusandae molestias accusantium tempora nisi explicabo. Quae, laboriosam odio. Ex sed cupiditate eligendi officiis, corporis laudantium odit illum nihil aspernatur!</p>
      <p>Quod inventore culpa earum asperiores placeat quisquam molestiae eos ratione quam. Porro odit non distinctio nemo at tempora ut atque rerum doloremque assumenda explicabo quia suscipit voluptas, iste esse dolorum.</p>
      <p>Deserunt magnam earum facere aperiam tenetur repellendus possimus in nemo rem dolorem amet esse quam, placeat, tempore expedita hic consequuntur nulla sed commodi quia autem, quisquam laborum fuga! Nemo, voluptates.</p>
      <p>Dignissimos quae saepe corrupti, minima ad aut. Corrupti aspernatur nulla tenetur est quisquam beatae nemo unde incidunt, dignissimos, consequuntur officia facere aut. Magni, odio sit quis deserunt minus ad rem?</p>
      <p>Voluptatem tenetur qui veritatis aspernatur repellendus, dignissimos nihil adipisci, reprehenderit officiis, nostrum officia assumenda voluptatum quidem eius placeat molestiae quo deleniti ad eaque nobis libero? Laudantium animi tempora vero ratione?</p>
      <p>Cumque eaque temporibus perferendis iusto iste quisquam vel minima ea atque unde voluptatum nostrum adipisci repellat repellendus similique aspernatur, debitis cum fuga laboriosam amet sequi qui nobis? Illum, consequatur facilis.</p>
      <p>Neque ad dolores iusto veritatis labore doloribus dolor error laudantium nostrum eligendi doloremque, eos id explicabo nemo modi ipsam blanditiis accusamus iure. Deleniti dignissimos saepe eius, commodi nesciunt nihil dolorem.</p>
      <p>Facilis sunt distinctio ducimus soluta commodi error a eum, quam itaque! Perferendis est molestias distinctio ullam ratione necessitatibus dolore amet, veritatis et minus ipsa vitae voluptate ipsam sit accusantium rem.</p>
      <p>Molestias molestiae aut nihil provident ut optio est error. Incidunt natus quaerat recusandae deleniti labore, facilis minus itaque necessitatibus totam ab veritatis consectetur tempora fugit porro, rem aliquid fuga sint!</p>
      <p>bottom</p>
    </q-scroll-area>
  </q-page>
</template>

<script>
var bMike = 'this is a test'
// var fs = require('fs')
export default {
  name: 'PageIndex',
  data () {
    return {
      message: bMike
    }
  },
  methods: {
    test1 () {
      // var fileList = ''
      // var vm = this
      // fs.readdir(this.$route.query.id, function (err, files) {
      //   if (err) {
      //     throw err
      //   }
      //   for (var index in files) {
      //     console.log(files[index])
      //     fileList += files[index] + '<br />'
      //   }
      //   console.log('FILELIST: ' + fileList)
      //   vm.message = fileList
      // })
      this.message = this.$route.query.id
    },
    test2 () {
      console.log('test: ' + this.$route.query.id)
      this.message = this.$route.query.id
    }
  },
  mounted () {
    this.test1()
  }
}
</script>
