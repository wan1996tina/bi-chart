<template lang="pug">
.file-choose
  h1 CSV Files
  p  You can manage files here !

  input(type="file" @change="onFileChange")
  .btn(@click="") Show in charts

  .cards-wrapper
    .fileCard(v-for='(card, index) in cards' @click="showData(card)")
      p {{card.name}}

</template>

<script>
export default {
  data () {
    return {
      cards: [{ name: '123.csv' }, { name: '456.csv' }, { name: '789.csv' }]
    }
  },
  methods: {
    onFileChange (e) {
      const cards = this.cards
      const file = e.target.files[0]
      const type = e.target.files[0].type
      if (type === 'application/vnd.ms-excel') {
        console.log('this is csv file')
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = function () {
          cards.push({ name: file.name, data: reader.result })
        }
      } else {
        alert('請上傳 CSV 檔!')
      }
    },
    showData (item) {
      console.log('child', item)
      this.$emit('show', item.data)
    }
  }
}
</script>

<style>
.file-choose{
  position: fixed;
  width: 20vw;
  height: 100vh;
  min-width: 100px;
  background: rgba(34,40,49,.3);
  top: 0;
  left: 0;
  padding-top: 100px;
  cursor: pointer;
}

.btn{
  width: 150px;
  height: 35px;
  line-height: 35px;
  margin: 25px auto;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0px 6px 6px rgba(0,0,0,.1)
}

.cards-wrapper {
  box-sizing: border-box;
  width: 100%;
  height: 60%;
  margin-top: 50px;
  /* background: #ffa; */
  overflow: scroll;
  padding: 15px;
}

.fileCard {
  width: 40%;
  height: 100px;
  background: #fff;
  border-radius:5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 15px;
  float: left;
  transition: 0.5s;
}
.fileCard:hover {
  transform: scale(1.05);
}
</style>
