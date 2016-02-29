module.exports = function(subject)
{
    this.subject = subject;
    this.getSubject = function() {
        return this.subject;
    }
}