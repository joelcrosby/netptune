﻿using AutoFixture;

using Netptune.Core.Entities;
using Netptune.Core.Relationships;
using Netptune.Core.ViewModels.ProjectTasks;

namespace Netptune.UnitTests;

public static class AutoFixtures
{
    private static readonly Fixture Fixture = CreateFixture();

    private static Fixture CreateFixture()
    {
        return new();
    }

    public static AppUser AppUser => Fixture
        .Build<AppUser>()
        .Without(p => p.ProjectTaskAppUsers)
        .Without(p => p.WorkspaceUsers)
        .Without(p => p.ProjectUsers)
        .Without(p => p.Tasks)
        .Without(p => p.Workspaces)
        .Without(p => p.ProjectTaskAppUsers)
        .Create();

    public static Project Project => Fixture
        .Build<Project>()
        .Without(p => p.ProjectUsers)
        .Without(p => p.ProjectTasks)
        .Without(p => p.ProjectPosts)
        .Without(p => p.ProjectBoards)
        .WithoutWorkspace()
        .Create();

    public static ProjectTask ProjectTask => Fixture
        .Build<ProjectTask>()
        .Without(p => p.ProjectTaskAppUsers)
        .Without(p => p.Project)
        .Without(p => p.ProjectTaskInBoardGroups)
        .Without(p => p.ProjectTaskTags)
        .Without(p => p.Tags)
        .With(p => p.Workspace, Workspace)
        .WithoutAuditable()
        .Create();

    public static BoardGroup BoardGroup => Fixture
        .Build<BoardGroup>()
        .Without(p => p.Board)
        .Without(p => p.Tasks)
        .Without(p => p.TasksInGroups)
        .WithoutWorkspace()
        .Create();

    public static Board Board => Fixture
        .Build<Board>()
        .Without(p => p.Project)
        .Without(p => p.BoardGroups)
        .WithoutWorkspace()
        .Create();

    public static List<BoardGroup> BoardGroups => new() { BoardGroup.WithTasks() };

    public static BoardGroup WithTasks(this BoardGroup boardGroup)
    {
        boardGroup.TasksInGroups = Fixture
            .Build<ProjectTaskInBoardGroup>()
            .Without(p => p.ProjectTask)
            .Without(p => p.BoardGroup)
            .CreateMany()
            .ToList();

        boardGroup.Tasks = Fixture
            .Build<TaskViewModel>()
            .CreateMany()
            .ToList();

        return boardGroup;
    }

    public static TaskViewModel TaskViewModel => Fixture
        .Build<TaskViewModel>()
        .Create();

    public static Workspace Workspace => Fixture
        .Build<Workspace>()
        .Without(p => p.Projects)
        .Without(p => p.WorkspaceUsers)
        .Without(p => p.Tasks)
        .Without(p => p.Users)
        .WithoutAuditable()
        .Create();

    public static Workspace WithProjects(this Workspace workspace)
    {
        workspace.Projects = Fixture
            .Build<Project>()
            .Without(p => p.ProjectUsers)
            .Without(p => p.ProjectTasks)
            .Without(p => p.ProjectPosts)
            .Without(p => p.ProjectBoards)
            .Without(p => p.Workspace)
            .With(p => p.Id, 1)
            .WithoutWorkspace()
            .CreateMany()
            .ToList();

        return workspace;
    }
}
