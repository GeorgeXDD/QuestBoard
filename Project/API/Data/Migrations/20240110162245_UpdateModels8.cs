using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class UpdateModels8 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_projectId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Tasks",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "state",
                table: "Tasks",
                newName: "State");

            migrationBuilder.RenameColumn(
                name: "projectId",
                table: "Tasks",
                newName: "ProjectId");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Tasks",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "assignedUserId",
                table: "Tasks",
                newName: "AssignedUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_projectId",
                table: "Tasks",
                newName: "IX_Tasks_ProjectId");

            migrationBuilder.RenameColumn(
                name: "title",
                table: "Projects",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "Projects",
                newName: "Description");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Tasks_Projects_ProjectId",
                table: "Tasks");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Tasks",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "State",
                table: "Tasks",
                newName: "state");

            migrationBuilder.RenameColumn(
                name: "ProjectId",
                table: "Tasks",
                newName: "projectId");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Tasks",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "AssignedUserId",
                table: "Tasks",
                newName: "assignedUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                newName: "IX_Tasks_projectId");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "Projects",
                newName: "title");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Projects",
                newName: "description");

            migrationBuilder.AddForeignKey(
                name: "FK_Tasks_Projects_projectId",
                table: "Tasks",
                column: "projectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
