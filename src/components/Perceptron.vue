<template lang='pug'>
  div.container
    div.container-iteration
      h1.title Perceptron  - total iteraciones {{iterations.length}}
      div.scroll
        div.iteration__item(v-for="(item) in iterations" :key="item.id")
          h2  Iteración {{item.id + 1}}
          div.item__pesos(v-for="(peso, i) in item.pesos" :key="i")
            p Pesos: {{peso.w}}
            span Bias: {{peso.bias}}
            div.peso__ajuste(v-for="(ajuste,a) in peso.ajuste" :key="a")
              p Ajuste: {{ajuste.w}} 
              span Bias: {{ajuste.bias}}
          p {{item.bias}}
          p {{item.a}}
    div.container-prueba
      h1.title Neurona entrenada
      div.neurona
        p.peso Pesos: 
          span {{Wi}} 
        p.bia Bias: 
          span {{biasi}}
      div.entrada-x
        h1.variable  X
          span.igual =
        div.entrada
          div.container_x(v-for="(x,i) in x" :key="i")
            div.btn {{x[0]}}
            div.btn {{x[1]}}
            div.btn {{x[2]}}
      div.container-eval
        div.container-input
          input.input(v-model="x1") 
          input.input(v-model="x2")
        button.btn(v-on:click="eval") EVALUAR
        p.result {{result}}
      div.container-result
        span {{resultO}}
</template>

<script>
  export default {
    mounted() {
      this.train(this.x);
    },
    data: () => ({
      x: [
        [5, -1, 1],
        [2, 6, 1],
        [3, 3, 1],
        [2, 1, -1],
        [-1, 1, -1],
        [1, -2, -1],
      ],
      Wi: [Math.random(), Math.random()],
      biasi: Math.random(),
      a: null,
      e: null,
      iterations: [],
      x1: null,
      x2: null,
      result: null,
      resultO: null,
    }),
    methods: {
      eval() {
        const result = (this.x1 * this.Wi[0]) + (this.Wi[1] * this.x2) + this.biasi;
        this.resultO = result;
        let a;
        if (result >= 0) {
          a = 1;
        } else {
          a = -1;
        }
        this.result = a;
      },
      train(valores) {
        let iteration = 0;
        while (true) {
          this.iterations.push({
            id: iteration,
            pesos: [],
          });
          let error = null;
          for (const i in valores) {
            if (Object.prototype.hasOwnProperty.call(valores, i)) {
              let item = 0;
              const x = valores[i];
              const temp = (x[0] * this.Wi[0]) + (this.Wi[1] * x[1]) + this.biasi;
              if (temp >= 0) {
                this.a = 1;
              } else {
                this.a = -1;
              }
              this.e = x[2] - this.a;
              this.iterations[iteration].pesos.push({
                w: this.Wi,
                bias: this.biasi,
                ajuste: [],
              });
              while (x[2] !== this.a) {
                error += 1;
                this.Wi = [this.Wi[0] + (this.e * x[0]), this.Wi[1] + (this.e * x[1])];
                this.biasi = this.e + this.biasi;
                const temp1 = (x[0] * this.Wi[0]) + (this.Wi[1] * x[1]) + this.biasi;
                this.iterations[iteration].pesos[item].ajuste.push({ w: this.Wi, bias: this.biasi });
                if (temp1 >= 0) {
                  this.a = 1;
                } else {
                  this.a = -1;
                }
                this.biasi = this.biasi;
              }
              item += 1;
            }
          }
          iteration += 1;
          if (!error) {
            break;
          }
        }
      },
    },
  };
</script>

<style lang="scss">
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 10px;
    grid-template-areas: 'iteration prueba';
    .container-iteration {
      grid-area: iteration;
      .title {
        color: var(--primary-color);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 10px;
      }
      .scroll {
      height: 70vh;
      overflow-y: scroll;
        .iteration__item {
          margin-top: 15px;
          padding: 10px;
          border-radius: 4px;
          box-shadow: rgba(0, 0, 0, .16) 1px 2px 6px;
          .item__pesos {
            background: #eeeeee;
            margin: 5px;
            padding: 10px;
            .peso__ajuste {
              background: rgba(128, 128, 128, .2);
              margin-left: 10px;
              margin-top: 2px;
              padding: 5px; 
            }
          }
        }
      }  
    }
    .container-prueba {
      grid-area: prueba;
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--primary-color);
        padding-bottom: 20px;
      }
      .neurona {
        background: rgba(128, 128, 128, .2);
        padding: 20px 10px;
        display: flex;
        justify-content: center;
        margin-bottom: 10px;
        .peso {
          font-weight: bold;
          span {
          font-weight: normal;
          }
        }
        .bia {
          font-weight: bold;
          margin-left: 5px;
          span {
            font-weight: normal;
          }
        }
      }
      .entrada-x {
        display: flex;
        justify-content: center;
        align-items: center;
        .variable {
          font-size: 50px;
          color: var(--primary-color);
          margin: 20px;
          .igual {
            margin: 10px;
          }
        }
        .container_x {
          .btn {
            width: 40px;
            height: 40px;
            background: var(--secondary-color-dark);
            border: 1px solid var(--primary-color);
            display: table-cell;
            vertical-align: middle;
            text-align: center;
          }
        }
      }
    }
    .container-eval {
      margin-top: 15px;
      box-shadow: rgba(0, 0, 0, .16) 1px 2px 6px;
      border-radius: 4px;
      padding: 10px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .container-input {
        display: flex;
        flex-direction: column;
        .input{
          height: 40px;
          width: 40px;
          text-align: center;
          margin: 5px;
        }
      }
      .btn {
        height: 80px;
        width: 80px;
        background: var(--primary-color-dark);
        border: none;
        border-radius: 4px;
        color: var(--primary-color-text);
        font-weight: bold;
        box-shadow: rgba(0, 0, 0, .2) 1px 2px 4px;
        text-decoration: none;
        outline: none;
        border: none;
        &:hover {
          cursor: pointer;
          opacity: .9;
        box-shadow: rgba(0, 0, 0, .4) 1px 2px 6px;
        }
      }
      .result {
        font-size: 50px;
        font-weight: bold;
        color: var(--secondary-color-dark)
      }
    }
    .container-result {
      margin-top: 10px;
      display: flex;
      color: rgba(128, 128, 128, .8);
      justify-content: center;
      align-items: center;
    }
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-button {
    width: 7px;
    height: 7px;
  }
  ::-webkit-scrollbar-thumb {
    background: #e1e1e1;
    border: 0px none #ffffff;
    border-radius: 20px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #ffffff;
  }
  ::-webkit-scrollbar-thumb:active {
    background: #666666;
  }
  ::-webkit-scrollbar-track {
    background: rgba(128, 128, 128, .05);
    border: 0px none #ffffff;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
</style>