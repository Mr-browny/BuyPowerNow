export function load_discos (state, payload) {
    state.all_discos = [] /* Setting it to Empty to avoid duplicate */
    state.all_discos.push(...payload) 
}
