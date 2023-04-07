namespace OnlineLearningWeb.Dto
{
    public class CourseDto
    {
        public int CourseId { get; set; }

        public int UserId { get; set; }

        public string CourseName { get; set; }

        public decimal Price { get; set; }

        public string? Img { get; set; }

        public string? Description { get; set; }

    }
}
