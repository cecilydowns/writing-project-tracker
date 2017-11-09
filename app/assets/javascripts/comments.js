function Comment(comment){
    this.id = comment.id
    this.content = comment.content
    this.user = {
        name: comment.user.name,
        id: comment.user.id,
        avatar: comment.user.avatar.thumb.url
    }
}

Comment.prototype.format = function(){
    return `<li class="media">
    <img class="d-flex mr-3 avatar-xs" src="${this.user.avatar}">
    <div class="media-body">
      ${this.content}<br>
      <small class="text-muted">
        <a href="/users/${this.user.id}">${this.user.name}</a>
          - Just now
      </small>
      <br><br>      
    </div>
    </li>`   
}

$(function(){
    $(".new_comment").on("submit", function(e) {

        e.preventDefault()

        $.post(this.action, $(this).serialize(), function(comment) {
            let newComment = new Comment(comment)
            let newCommentHTML = newComment.format()
            $(".list-unstyled").append(newCommentHTML)
            $("#comment_content").val("")
        })
    })

    $(".delete-comment").click(function(e) {
        e.stopImmediatePropagation()
        e.preventDefault()

        let commentId = this.getAttribute("data-comment-id")

        $.ajax({
            type: 'DELETE',
            beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},   
            url: this.href,
            success: function(e) {
                $("#comment-" + commentId).remove()
            }
        });
    })


})
