namespace OnlineLearningWeb.Dto
{
    public class EnrollmentDto
    {

        public int UserId { get; set; }

        public int CourseId { get; set; }

        public string? TransactionId { get; set; }
        public string? PayerId { get; set; }

        public string? EmailPayment { get; set; }
        public DateTime Date { get; set; }

        public string Status { get; set; } = null!;




    }
}
