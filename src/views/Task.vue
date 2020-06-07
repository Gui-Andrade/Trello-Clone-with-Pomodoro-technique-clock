<template>
  <div class="task-view">
    <div class="flex flex-col flex-grow items-start justify-between px-4">
      <input
      type="text"
      class="p-2 w-full mr-2 flex-grow text-xl font-bold"
      :value="task.name"
      @change="updateTaskProperty($event, 'name')"
      @keyup.enter="updateTaskProperty($event, 'name')"
      >
      <textarea
      :value="task.description"
      class="relative bg-transparent px-2 mt-2 h-64 border-none"
      @change="updateTaskProperty($event, 'description')"
      >
      </textarea>

      <pomodoro-clock v-on:incrementPomodoroBy="incrementPomodoro"/>

      <p>
        Pomodoros used working on this task: {{ pomodorosDone }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PomodoroClock from '@/components/PomodoroClock.vue'
export default {
  data() {
    return {
      pomodorosDone: 0
      // Add functionality to track when pomodoros are done and add them to the task
    }
  },
  components: { PomodoroClock },
  computed: {
    ...mapGetters(['getTask']),
    task () {
      return this.getTask(this.$route.params.id)
    }
  },
  methods: {
    updateTaskProperty (e, key) {
      this.$store.commit('UPDATE_TASK', {
        task: this.task,
        key,
        value: e.target.value
      })
    },
    incrementPomodoro: function (pomValue) { 
      this.pomodorosDone = this.pomodorosDone + pomValue
    }
  }
}
</script>

<style>
.task-view {
  @apply relative flex flex-row bg-white pin mx-4 m-32 mx-auto py-4 text-left rounded shadow;
  max-width: 700px;
}
</style>
