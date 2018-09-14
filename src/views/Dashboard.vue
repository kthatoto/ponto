<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="6">
        <v-date-picker
          mode='single'
          v-model='selectedDate'
          :attributes='attributes'
          @dayclick='dayClicked'
          class='kalendar'>
        </v-date-picker>
      </b-col>
      <b-col sm="6" lg="6">
        <b-row class="subjectDetails">
          <b-col sm="5" lg="5"
            v-for="subject in ['ari', 'jap', 'sci', 'civ']"
            :key="subject"
            class="subjectDetails__item"
            :class="'-' + subject">
            <h3>{{ subjects[subject].name }}</h3>
            <div>テスト回数：<span>2回</span></div>
            <div>正答率：<span>89%</span></div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: 'dashboard',
  components: {},
  data () {
    return {
      selectedDate: new Date(),
      subjects: {
        ari: {
          name: '算数'
        },
        jap: {
          name: '国語'
        },
        sci: {
          name: '理科'
        },
        civ: {
          name: '社会'
        }
      },
      attributes: [
        {
          key: 1,
          dot: { backgroundColor: 'green' },
          dates: [new Date(), new Date(2018, 8, 10), new Date(2018, 7, 1)],
          excludeDates: null,
          order: 0
        }
      ],
    }
  },
  methods: {
    dayClicked () {
    }
  }
}
</script>

<style>
.kalendar input[type=text] {
  display: none;
}
.kalendar .popover-origin .popover-content-wrapper .popover-content.direction-bottom:after {
  display: none;
}
</style>
<style lang="scss" scoped>
.kalendar {
  margin-left: 120px;
  transform: scale(1.5);
}
.subjectDetails {
  padding-top: 13px;
  &__item {
    padding: 15px;
    margin: 5px;
    color: white;
    &.-ari { background-color: #20a8d8; }
    &.-jap { background-color: #f86c6b; }
    &.-sci { background-color: #4dbd74; }
    &.-civ { background-color: #6f42c1; }
    h3 {
      font-weight: bold;
    }
    div > span {
      font-size: larger;
      font-weight: bold;
    }
  }
}
</style>
