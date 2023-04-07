namespace OnlineLearningWeb.Dto
{
    public class MaterialDto
    {
        public int MaterialId { get; set; }

        public int ChapterId { get; set; }

        public string Title { get; set; } = null!;

        public string Content { get; set; } = null!;

        public string Description { get; set; } = null!;
    }
}
