export default function ({
  route,
  redirect,
  store
}) {
  console.log("auth middleware")
  if (route.name === 'login') {
    // skip middleware
    return
  }

  if (!store.state.auth.accessToken) {
    console.log('redirect cause non existing access-token')
    redirect('/login')
  }
}
