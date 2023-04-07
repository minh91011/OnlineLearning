using Microsoft.EntityFrameworkCore;
using OnlineLearningWeb.Data;
using OnlineLearningWeb.Interface;
using OnlineLearningWeb.Models;
using OnlineLearningWeb.Repository;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace OnlineLearningWeb
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// Add services to the container.

			builder.Services.AddControllers();
			// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddSwaggerGen();

			builder.Services.AddDbContext<OnlineLearningContext>(
				o => o.UseSqlServer(builder.Configuration.GetConnectionString("SqlServer")));
			builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
			builder.Services.AddScoped<IPostRepository, PostRepository>();
			builder.Services.AddScoped<ICommentRepository, CommentRepository>();
			builder.Services.AddScoped<ICommentVoteRepository, CommentVoteRepository>();
			builder.Services.AddScoped<IPostVoteRepository, PostVoteRepository>();
			builder.Services.AddScoped<IUserRepository, UserRepository>();
			builder.Services.AddScoped<IAssignmentRepository, AssignmentRepository>();
			builder.Services.AddScoped<IChapterRepository, ChapterRepository>();
			builder.Services.AddScoped<IQuestionRepository, QuestionRepository>();
			builder.Services.AddScoped<IMaterialRepository, MaterialRepository>();
			builder.Services.AddScoped<ICourseRepository, CourseRepository>();
			builder.Services.AddScoped<IEnrollmentRepository, EnrollmentRepository>();
			builder.Services.AddScoped<IAuthService, AuthService>();

            builder.Services.AddScoped<IStudentAnswerRepository, StudentAnswerRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
			{
				app.UseSwagger();
				app.UseSwaggerUI();
			}
            app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());

            app.UseHttpsRedirection();
			app.UseRouting();
			app.UseAuthorization();


			app.MapControllers();

			app.Run();
		}
	}
}