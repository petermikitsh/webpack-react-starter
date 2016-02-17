export default function home(state = {}, action) {
  switch (action.type) {
    case 'RAND_SET':
      return action.value;
    default:
      return null;
  }
}
