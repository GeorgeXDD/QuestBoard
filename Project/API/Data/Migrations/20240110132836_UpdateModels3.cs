using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_Id",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .Annotation("Sqlite:Autoincrement", true);

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_projectId",
                table: "Tasks",
                column: "projectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_projectId",
                table: "Tasks",
                column: "projectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_projectId",
                table: "Tasks");

            migrationBuilder.DropIndex(
                name: "IX_Tasks_projectId",
                table: "Tasks");

            migrationBuilder.AlterColumn<int>(
                name: "Id",
                table: "Tasks",
                type: "INTEGER",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "INTEGER")
                .OldAnnotation("Sqlite:Autoincrement", true);

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_Id",
                table: "Tasks",
                column: "Id",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
