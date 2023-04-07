using AutoMapper;
using OnlineLearningWeb.Dto;
using OnlineLearningWeb.Models;

namespace OnlineLearningWeb.Helper
{
	public class MappingProfile : Profile
	{
		public MappingProfile()
		{
			CreateMap<Comment, CommentDto>();
			CreateMap<CommentDto, Comment>();
			CreateMap<Post, PostDto>();
			CreateMap<PostDto, Post>();
			CreateMap<CommentVote,CommentVoteDto>();
			CreateMap<CommentVoteDto, CommentVote>();
			CreateMap<PostVote, PostVoteDto>();
			CreateMap<PostVoteDto, PostVote>();
			CreateMap<Assignment, AssignmentDto>();
			CreateMap<AssignmentDto, Assignment>();
			CreateMap<Chapter, ChapterDto>();
			CreateMap<ChapterDto, Chapter>();
			CreateMap<Material, MaterialDto>();
			CreateMap<MaterialDto, Material>();
            CreateMap<Material, MaterialFileDto>();
            CreateMap<MaterialFileDto, Material>();
            CreateMap<Question, QuestionDto>();
			CreateMap<QuestionDto, Question>();
			CreateMap<StudentAnswer, StudentAnswerDto>();
			CreateMap<StudentAnswerDto, StudentAnswer>();
			CreateMap<Course, CourseDto>();
			CreateMap<CourseDto, Course>();
			CreateMap<EnrollmentDto, Enrollment>();
			CreateMap<Enrollment, EnrollmentDto>();
		}
	}
}
