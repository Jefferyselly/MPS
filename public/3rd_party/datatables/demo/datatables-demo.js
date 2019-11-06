// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable({
  	"pagingType": "full_numbers",
   "paging": true,
   "lengthMenu": [10, 25, 50, 75, 100]
  });
});
