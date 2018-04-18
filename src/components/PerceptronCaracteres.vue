<template lang='pug'>
  div.container
    div.container-iteration
      h1.title Perceptron  - total Bist {{iterations.length}}
      div.scroll
        div.iteration__item(v-for="(item,i) in iterations" :key="i")
          h2  Bit {{i + 1}}
          div.item__pesos(v-for="(peso, i) in item.pesos" :key="i")
            p Peso {{i+1}} : {{item.pesos[i]}}
            div.peso__ajuste(v-for="(ajuste,a) in peso.ajuste" :key="a")
              p Ajuste: {{ajuste.w}} 
              span Bias: {{ajuste.bias}}
          p Bias: {{item.bias}}
    div.container-prueba
      h1.title Neurona entrenada
      div.entrada-x
        h1.variable  X
          span.igual =
        div.entrada
          div.container_x(v-for="(x,i) in X" :key="i" v-on:click="selectV(x, i+1)")
            div.btn-container(v-for="(btn,i1) in x" :key="i1")
              div.btn {{btn}}
      div.container-eval
        div.container-input
          div.input {{select}}
        button.btn(v-on:click="eval") EVALUAR
        p.result {{result}}
      div.container-result
        p {{resultO}}
        p.result1 {{result1}}
</template>

<script>
  export default {
    created() {
      for (let i = 0; i < 4; i += 1) {
        this.Wi.push([]);
        this.biasi.push(Math.random());
        for (let item = 0; item < 15; item += 1) {
          this.Wi[i].push(Math.random());
        }
      }
    },
    mounted() {
      this.train();
    },
    data: () => ({
      X: [
        [1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
      ],
      D: [
        [0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
      ],
      Wi: [],
      biasi: [],
      a: null,
      e: null,
      iterations: [],
      x: null,
      result: null,
      resultO: null,
      result1: null,
      select: null,
    }),
    methods: {
      selectV(items, index) {
        this.select = `Fila: ${index}`;
        this.result = null;
        this.x = items;
      },
      eval() {
        let a = null;
        let binary = '';
        this.result1 = [];
        this.resultO = [];
        for (const bits in this.Wi) {
          if (Object.prototype.hasOwnProperty.call(this.Wi, bits)) {
            let acum = 0;
            for (let item = 0; item < this.x.length; item += 1) {
              const pesos = this.Wi[bits][item];
              acum += (this.x[item] * pesos);
            }
            const result = acum + this.biasi[bits];
            if (result >= 0) {
              a = 1;
            } else {
              a = 0;
            }

            this.resultO.push(result);
            this.result1.push(a);
            binary += a;
          }
        }
        this.result = parseInt(binary, 2);
      },
      train() {
        for (const w in this.Wi) {
          if (Object.prototype.hasOwnProperty.call(this.Wi, w)) {
            this.iterations.push({
              id: w,
              pesos: [],
            });
            while (true) {
              let error = null;
              for (const x in this.X) {
                if (Object.prototype.hasOwnProperty.call(this.X, x)) {
                  const element = this.X[x];
                  let acum = 0;
                  for (let item = 0; item < element.length; item += 1) {
                    const pesos = this.Wi[w][item];
                    acum += (element[item] * pesos);
                  }
                  const result = acum + this.biasi[w];
                  if (result >= 0) {
                    this.a = 1;
                  } else {
                    this.a = 0;
                  }
                  while (this.D[w][x] !== this.a) {
                    error += 1;
                    let acum1 = 0;
                    this.e = this.D[w][x] - this.a;
                    this.biasi[w] = this.e + this.biasi[w];
                    for (let i = 0; i < element.length; i += 1) {
                      this.Wi[w][i] = this.Wi[w][i] + (this.e * element[i]);
                      const pesos = this.Wi[w][i];
                      acum1 += (element[i] * pesos);
                    }
                    const result1 = acum1 + this.biasi[w];
                    if (result1 >= 0) {
                      this.a = 1;
                    } else {
                      this.a = 0;
                    }
                  }
                }
              }
              if (!error) {
                this.iterations[w].pesos = this.Wi[w];
                this.iterations[w].bias = this.biasi[w];
                break;
              }
            }
          }
        }
      },
    },
  };
</script>

<style lang="scss" scoped>
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
          font-size: 25px;
          color: var(--primary-color);
          margin: 5px;
          .igual {
            margin: 10px;
          }
        }
        .container_x {
          .btn-container {
            background: var(--secondary-color-dark);
            border: 0.001em solid var(--primary-color);
            display: table-cell;
            vertical-align: middle;
            text-align: center;
            .btn {
              width: 25px;
              height: 25px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }
          &:hover {
            cursor: pointer;
            box-shadow: rgba(0, 0, 0, .4) 0px 0 16px;
            color: white;
            font-weight: bold;
          }
        }
      }
    }
    .container-eval {
      margin-top: 10px;
      box-shadow: rgba(0, 0, 0, .16) 1px 2px 6px;
      border-radius: 4px;
      padding: 5px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      .container-input {
        display: flex;
        flex-direction: column;
        align-items: center;
        .input{
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
      margin-top: 20px;
      display: flex;
      color: rgba(128, 128, 128, .9);
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
      font-size: 13px;
      font-weight: bold;
      .result1 {
        font-weight: normal;
        font-size: 25px;
      }
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