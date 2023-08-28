<template>
  <Transition name="slide-fade">
    <div class="wrapper-modalBackdrop" :style="styleBackdrop" v-if="open">
      <div class="modalComp-modalContainer" :style="styleModal">
        <div class="modalComp-header">
          <div class="modalComp-header__text">{{ title }}</div>
          <button class="btn" @click="onCancel()"><i class="fas fa-times"></i></button>
        </div>

        <div class="modalComp-content" :style="styleContent">
          <slot />
        </div>

        <div class="modalComp-footer">
          <button v-if="showAdd" class="btn btn-success mr-auto" @click="onAddClicked()">
            {{ textAdd }}
          </button>
          <button class="btn btn-secondary mr-2" @click="onCancel()">Cancel</button>
          <button class="btn btn-success" @click="onOk()">{{ okText }}</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
export default {
  name: 'ModalComponent',
  props: {
    open: {
      type: Boolean,
      default: false
    },
    onCancel: {
      type: Function,
      default: () => {
        console.log('on cancel!')
      }
    },
    onOk: {
      type: Function,
      default: () => {
        console.log('on ok!')
      }
    },
    okText: {
      type: String,
      default: 'OK'
    },
    title: {
      type: String,
      default: 'Title'
    },

    /**
     * Styles background
     */
    styleBackdrop: {
      default: {}
    },

    /**
     * Styles container modal
     */
    styleModal: {
      default: {}
    },

    /**
     * Styles content
     */
    styleContent: {
      default: {}
    },

    showAdd: {
      type: Boolean,
      default: false
    },

    textAdd: {
      type: String,
      default: 'Add'
    },

    onAddClicked: {
      type: Function,
      default: () => {}
    }
  }
}
</script>
<style lang="scss" scoped>
.wrapper-modalBackdrop {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: #00000073;
  overflow: hidden;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .modalComp-modalContainer {
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.3rem;
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
    width: 550px;
    margin: 24px 10px 10px;
    max-height: calc(100vh - 34px);
    overflow-y: auto;
  }

  .modalComp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    border-bottom: 1px solid #e9ecef;

    .modalComp-header__text {
      font-size: 20px;
      font-weight: 500;
    }
  }

  .modalComp-content {
    flex: 1 1 auto;
    padding: 1rem;
    height: fit-content;
    overflow-y: auto;
  }

  .modalComp-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-end;
    padding: 0.75rem;
    border-top: 1px solid #e9ecef;
  }
}

.slide-fade-enter-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-fade-enter-from {
  opacity: 0;

  .modalComp-modalContainer {
    transform: translateY(-100%);
    opacity: 0;
    transition: all 0.5s ease-in-out;
  }
}

.slide-fade-enter-to {
  .modalComp-modalContainer {
    transform: translateY(0);
    transition: all 0.5s ease-in-out;
  }
}

.slide-fade-leave-to {
  opacity: 0;

  .modalComp-modalContainer {
    transform: translateY(-100%);
    transition: all 0.5s ease-in-out;
  }
}
</style>
