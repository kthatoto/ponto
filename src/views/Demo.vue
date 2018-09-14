<template lang="pug">
div.wrapper
  div.header ponto
    span.header__grade(v-if="grade > 0") {{ grades[grade-1] }}
    span.header__partial(v-if="grade > 0") の
    span.header__subject(v-if="subject.name") {{ subject.name[grade-1] }}
  div.main
    div.back(v-show="screen <= 2")
      div(v-show="screen > 0" @click="back")
        icon.icon(name="chevron-left")
        | もどる
    div.grade(v-show="screen === 0")
      div.grade__item(v-for="grade in [1, 2, 3]" :key="grade" @click="selectGrade(grade)")
        span(v-if="grade === 1") しょうがく{{ grade }}ねんせい
        span(v-else) 小学{{ grade }}年生
        img.grade__star(v-for="i in [0, 1, 2]" :key="i" v-if="i < grade" src="img/star.png")
    div.subject(v-show="screen === 1")
      div.subject__item(v-for="subject in subjects"
        :key="subject.slug" :class="'-' + subject.slug"
        @click="selectSubject(subject)")
        span {{ subject.name[grade-1] }}
    div.pause(v-show="screen === 2")
      div.pause__main(@click="start")
        span.pause__ponto ponto
        span にタッチしよう！
    div.problem(v-show="screen === 3")
      div.problem__content
        p.problem__content__header もんだい
        | {{ problems[problemIndex].problem.content }}
      div.problem__options(v-for="(option, i) in problems[problemIndex].options"
        @click="selectOption(i)")
        | {{ option.content }}
    div.finish(v-show="screen === 4")
      div.finish__main(@click="finish")
        span よくがんばったね！
        br
        span.finish__ponto ponto
        span にタッチしよう！
    div.result(v-show="screen === 5")
      div.result__item(v-for="(result, i) in answers")
        p.result__item__header もんだい{{ i + 1 }}
        div.result__item__wrap
          div.result__item__content {{ problems[i].problem.content }}
          div.result__item__result
            icon(:name="answers[i] ? 'circle' : 'times'" :class="answers[i] ? 'maru' : 'batsu'")
</template>

<script>
export default {
  data () {
    return {
      screen: 2,
      grade: 0,
      problemIndex: 0,
      grades: ['しょうがく1ねんせい', '小学2年生', '小学3年生'],
      subject: {},
      subjects: [
        {
          slug: 'arithmetic',
          name: ['さんすう', '算数', '算数']
        },
        {
          slug: 'japanese',
          name: ['こくご', '国語', '国語']
        },
        {
          slug: 'science',
          name: ['りか', '理科', '理科']
        },
        {
          slug: 'civics',
          name: ['しゃかい', '社会', '社会']
        }
      ],
      problems: [
        {
          problem: { content: '1 + 1 = ?' },
          options: [
            { content: '1', correct: false }, { content: '2', correct: true },
            { content: '3', correct: false }, { content: '4', correct: false }
          ]
        },
        {
          problem: { content: '7 + 8 = ?' },
          options: [
            { content: '12', correct: false }, { content: '13', correct: false },
            { content: '14', correct: false }, { content: '15', correct: true },
          ]
        },
        {
          problem: { content: '5 - 2 = ?' },
          options: [
            { content: '1', correct: false }, { content: '2', correct: false },
            { content: '3', correct: true }, { content: '4', correct: false }
          ]
        },
        {
          problem: { content: '13 - 7 = ?' },
          options: [
            { content: '4', correct: false }, { content: '5', correct: false },
            { content: '6', correct: true }, { content: '7', correct: false }
          ]
        },
        {
          problem: { content: 'たかしくんはリンゴをかいました。いくらでしょうか？' },
          options: [
            { content: 'サラリーマンの3かげつぶんのきゅうりょう', correct: false },
            { content: 'たかしくんの1ねんぶんのおこづかい', correct: false },
            { content: '100えん', correct: false },
            { content: 'え...', correct: true }
          ]
        }
      ],
      answers: []
    }
  },
  methods: {
    selectGrade (grade) {
      this.screen = 1
      this.grade = grade
    },
    selectSubject (subject) {
      this.subject = subject
      this.screen = 2
    },
    back () {
      if (this.screen === 1) {
        this.screen = 0
        this.grade = 0
      }
      if (this.screen === 2) {
        this.screen = 1
        this.subject = {}
      }
    },
    start () {
      this.screen = 3
    },
    selectOption (i) {
      this.answers.push(this.problems[this.problemIndex].options[i].correct)
      if (this.problems[this.problemIndex].options.length > this.problemIndex) {
        this.problemIndex += 1
      } else {
        this.screen = 4
      }
    },
    finish () {
      this.screen = 5
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  width: 100%;
  height: 100%;
}
.header {
  background-color: #4dbd74;
  color: white;
  padding: 20px;
  font-weight: bold;
  font-size: 24px;
  &__grade {
    font-size: 16px;
    margin-left: 15px;
  }
  &__partial {
    font-size: 13px;
  }
  &__subject {
    font-size: 18px;
  }
}
.main {
  padding: 20px;
}
.back {
  height: 30px;
}
.grade {
  &__item {
    border: 3px dashed #20a8d8;
    background-color: white;
    margin-bottom: 10px;
    padding: 15px;
    color: #333;
    font-weight: bold;
    border-radius: 5px;
    position: relative;
  }
  &__star {
    width: 25px;
    float: right;
  }
}
.subject {
  &__item {
    border: 3px dashed;
    background-color: white;
    margin-bottom: 10px;
    padding: 15px;
    color: #333;
    font-weight: bold;
    border-radius: 5px;
    position: relative;
    &.-arithmetic { border-color: #20a8d8; }
    &.-japanese { border-color: #f86c6b; }
    &.-science { border-color: #4dbd74; }
    &.-civics { border-color: #6f42c1; }
  }
}
.pause {
  text-align: center;
  &__main {
    vertical-align: middle;
    line-height: 250px;
    border-radius: 50%;
    margin: 130px auto;
    color: white;
    font-weight: bold;
    width: 250px;
    height: 250px;
    background-color: #4dbd74;
  }
  &__ponto {
    font-size: larger;
  }
}
.problem {
  &__content {
    background-color: white;
    padding: 20px;
    margin-bottom: 30px;
    &__header {
      font-size: 22px;
      font-weight: bold;
    }
  }
  &__options {
    margin: 10px 0;
    background-color: white;
    padding: 20px;
  }
}
.finish {
  text-align: center;
  &__main {
    vertical-align: middle;
    padding-top: 100px;
    border-radius: 50%;
    margin: 130px auto;
    color: white;
    font-weight: bold;
    width: 250px;
    height: 250px;
    background-color: #4dbd74;
  }
  &__ponto {
    font-size: larger;
  }
}
.result {
  &__item {
    &__header {
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 5px;
      clear: both;
    }
    &__wrap {
      background-color: white;
      padding: 20px;
      margin-bottom: 10px;
      overflow: hidden;
    }
    &__content {
      float: left;
      width: 80%;
    }
    &__result {
      float: right;
      width: 20%;
      background-color: white;
      text-align: right;
      .maru {
        color: red;
        width: 30px;
        height: 30px;
      }
      .batsu {
        color: blue;
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
