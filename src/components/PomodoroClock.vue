<template>
  <div class="pomodoro-timer">
    <div class="pomodoro-timer__controls">
      <button class="pomodoro-timer__button" @click="resetTimer">Reset Timer</button>
      <button class="pomodoro-timer__button" @click="restartTimer">Pomodoro Work</button>
      <!-- <button class="pomodoro-timer__button" @click="startTimer(300)">Break</button>
      <button class="pomodoro-timer__button" @click="startTimer(1200)">Longer Break</button> -->
    </div>
    <div class="base-timer">
      <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <g class="base-timer__circle">
          <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
          <path
            :stroke-dasharray="circleDasharray"
            class="base-timer__path-remaining"
            :class="remainingPathColor"
            d="
              M 50, 50
              m -45, 0
              a 45,45 0 1,0 90,0
              a 45,45 0 1,0 -90,0
            "
          ></path>
        </g>
      </svg>
      <span class="base-timer__label">{{ formattedTimeLeft }}</span>
    </div>
  </div>
</template>

<script>
const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 10
const ALERT_THRESHOLD = 5

const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
}

// const timeLimit = 1500

export default {
  data () {
    return {
      timePassed: 0,
      timerInterval: null,
      timeLimit: 1500
    }
  },
  computed: {
    circleDasharray () {
      return `${(this.timeFraction * FULL_DASH_ARRAY).toFixed(0)} 283`
    },

    formattedTimeLeft () {
      const timeLeft = this.timeLeft
      const minutes = Math.floor(timeLeft / 60)
      let seconds = timeLeft % 60

      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    },

    timeLeft () {
      return this.timeLimit - this.timePassed
    },

    timeFraction () {
      const rawTimeFraction = this.timeLeft / this.timeLimit
      return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction)
    },
    remainingPathColor () {
      const { alert, warning, info } = COLOR_CODES

      if (this.timeLeft <= alert.threshold) {
        return alert.color
      } else if (this.timeLeft <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    }
  },
  watch: {
    timeLeft (newValue) {
      if (newValue === 0) {
        this.onTimesUp()
      }
    }
  },
  methods: {
    onTimesUp () {
      clearInterval(this.timerInterval)
    },
    startTimer () {
      this.timeLimit = 1500
      this.timePassed = 0
      clearInterval(this.timerInterval)
      this.timerInterval = setInterval(() => (this.timePassed += 1), 1000)
    },
    restartTimer () {
      this.startTimer()
    },
    resetTimer () {
      this.startTimer()
      this.onTimesUp()
    }
  }
}
</script>
<style scoped lang="scss">
.base-timer {
  margin: 30px;
  position: relative;
  width: 140px;
  height: 140px;

  &__svg {
    transform: scaleX(-1);
  }

  &__circle {
    fill: none;
    stroke: none;
  }

  &__path-elapsed {
    stroke-width: 7px;
    stroke: grey;
  }

  &__path-remaining {
    stroke-width: 7px;
    stroke-linecap: round;
    transform: rotate(90deg);
    transform-origin: center;
    transition: 1s linear all;
    fill-rule: nonzero;
    stroke: currentColor;

    &.green {
      color: rgb(65, 184, 131);
    }

    &.orange {
      color: orange;
    }

    &.red {
      color: red;
    }
  }

  &__label {
    position: absolute;
    width: 140px;
    height: 140px;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 32px;
  }
}

.pomodoro-timer__controls {
  display: flex;
  margin-top: 40px;
  max-width: 400px;
}

.pomodoro-timer__controls > * {
  flex: 1;
}

.pomodoro-timer__controls form {
  flex: 1;
  display: flex;
}

.pomodoro-timer__controls input {
  flex: 1;
  border: 0;
  padding: 1rem;
}

.pomodoro-timer__button {
  background: none;
  border: 0;
  cursor: pointer;
  color: white;
  font-size: 1rem;
  text-transform: uppercase;
  background: rgba(0,0,0,0.1);
  border-bottom: 3px solid rgba(0,0,0,0.2);
  border-right: 1px solid rgba(0,0,0,0.2);
  padding: 0.8rem;
}

.pomodoro-timer__button:hover,
.pomodoro-timer__button:focus {
  background: rgba(0,0,0,0.2);
  outline: 0;
}
</style>