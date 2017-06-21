// Popap bootstrap
$('#exampleModal').on('show.bs.modal', function (event) {
  let button = $(event.relatedTarget) // Button that triggered the modal
  let recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  let modal = $(this)
  modal.find('.modal-title').text('Обратная связь')
  modal.find('.modal-body input').val(recipient)
})
// Navigation to the project
$(document).ready(function() {
	$('.header-anchor__img').on('click', function(e) {
		e.preventDefault();

		showSection($(this).attr('href'), true);
	});

	showSection(window.location.hash, false);
}); // - > ready_project

function showSection(section, isAnimate) {
	let 
		direction = section.replace(/#/, ''),
		reqSection = $('.content').filter('[data-section="' + direction +'"]'),
		reqSectionPos = reqSection.offset().top;

	if(isAnimate) {
		$('body, html').animate({scrollTop: reqSectionPos}, 500);
	}
}