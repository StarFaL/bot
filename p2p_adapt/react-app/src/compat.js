
// Compatibility helpers for legacy app.js usage
window.ShowScreen = function(name) {
  console.log('ShowScreen called:', name);
}
window.vibrateTap = function() {
  if (navigator.vibrate) navigator.vibrate(20);
}
