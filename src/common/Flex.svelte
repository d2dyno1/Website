<script lang="ts">
  export let id = "";
  export let direction: Direction = "";
  export let align: Alignment = "";
  export let justify: Alignment = "";
  export let inline = false;
  export let wrap = false;
  export let reverse = false;
  export let gap = false;

  type Direction = "row" | "column" | "row-reverse" | "column-reverse" | ""
  type Alignment = "center" | "start" | "end" | "between" | "around" | "evenly" | ""
</script>

<div class={ `flex-container direction-${direction} align-${align} justify-${justify} ${$$props.class ?? ''}`}
     class:gap class:inline class:reverse class:wrap {id}>
  <slot />
</div>

<style lang="scss">
	.flex-container {
		display: flex;

		&.direction- {
			&row {
				flex-direction: row;
			}

			&column {
				flex-direction: column;
			}

			&row.reverse {
				flex-direction: row-reverse;
			}

			&column.reverse {
				flex-direction: column-reverse;
			}
		}

		&.justify- {
			&center {
				justify-content: center;
			}

			&start {
				justify-content: flex-start;
			}

			&end {
				justify-content: flex-end;
			}

			&between {
				justify-content: space-between;
			}

			&around {
				justify-content: space-around;
			}

			&evenly {
				justify-content: space-evenly;
			}
		}

		&.align- {
			&center {
				align-items: center;
			}

			&start {
				align-items: flex-start;
			}

			&end {
				align-items: flex-end;
			}

			&between {
				align-content: space-between;
			}

			&around {
				align-content: space-around;
			}

			&evenly {
				align-content: space-evenly;
			}
		}

		&.inline {
			display: inline-flex;
		}

		&.wrap {
			flex-wrap: wrap;
		}

		&.gap {
			gap: 10px;
		}
	}
</style>