export default function ({store}) {
  return store.dispatch("auth/init")
}
