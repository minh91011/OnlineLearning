namespace OnlineLearningWeb.Dto
{
    public class MaterialFileDto
    {
        public int ChapterId { get; set; }

        public string Title { get; set; } = null!;

        public string? Content { get; set; } = null;

        public string Description { get; set; } = null!;

        public IFormFile Video { get; set; } = null!;
    }
}
