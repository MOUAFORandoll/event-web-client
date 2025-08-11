<template>
  <div class="toast-container">
    <transition-group name="toast-fade" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast-item"
        :class="{
          'toast-success': toast.type === 'success',
          'toast-error': toast.type === 'error',
        }"
        @mouseenter="pauseTimer(toast.id)"
        @mouseleave="resumeTimer(toast.id)"
      >
        <div class="toast-content">
          <span class="toast-icon" v-if="toast.type === 'success'">✔</span>
          <span class="toast-icon" v-else-if="toast.type === 'error'">✖</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
        <button class="toast-close" @click="dismiss(toast.id)">×</button>
      </div>
    </transition-group>
  </div>
  
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ToastContainer",
  data() {
    return {
      timers: {},
      remaining: {},
      startedAt: {},
    };
  },
  computed: {
    ...mapGetters(["toasts"]),
  },
  watch: {
    toasts: {
      immediate: true,
      handler(newToasts) {
        newToasts.forEach((t) => {
          if (!this.timers[t.id]) {
            this.startTimer(t);
          }
        });
      },
    },
  },
  methods: {
    ...mapActions(["removeToast"]),
    startTimer(toast) {
      this.startedAt[toast.id] = Date.now();
      this.remaining[toast.id] = toast.duration || 4000;
      this.timers[toast.id] = setTimeout(() => {
        this.dismiss(toast.id);
      }, this.remaining[toast.id]);
    },
    pauseTimer(id) {
      if (this.timers[id]) {
        clearTimeout(this.timers[id]);
        this.timers[id] = null;
        const elapsed = Date.now() - (this.startedAt[id] || Date.now());
        this.remaining[id] = Math.max(0, (this.remaining[id] || 0) - elapsed);
      }
    },
    resumeTimer(id) {
      if (!this.timers[id]) {
        this.startedAt[id] = Date.now();
        this.timers[id] = setTimeout(() => {
          this.dismiss(id);
        }, this.remaining[id] || 2000);
      }
    },
    dismiss(id) {
      if (this.timers[id]) {
        clearTimeout(this.timers[id]);
      }
      delete this.timers[id];
      delete this.remaining[id];
      delete this.startedAt[id];
      this.removeToast(id);
    },
  },
};
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1080;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.toast-item {
  min-width: 260px;
  max-width: 360px;
  color: #fff;
  border-radius: 6px;
  padding: 10px 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toast-success {
  background: #2dce89; /* Argon success */
}

.toast-error {
  background: #f5365c; /* Argon danger */
}

.toast-content {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.toast-icon {
  font-weight: bold;
}

.toast-message {
  line-height: 1.3;
}

.toast-close {
  background: transparent;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.25s ease;
}
.toast-fade-enter,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>


