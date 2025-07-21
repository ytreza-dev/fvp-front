import {describe, expect, it} from "vitest";

class TaskFvpQuery {
    public repo: TaskRepository;

    query(): [Task, Task] {
        let nextTaskIndex = this.getNextTaskIndex();
        let newTaskIndex = this.getNewTaskIndex(nextTaskIndex);

        let newTask = this.repo.initialTasks[newTaskIndex];

        return [
            this.repo.initialTasks[nextTaskIndex],
            newTask
        ];

    }

    private getNewTaskIndex(nextTaskIndex: number) {
        let newTaskIndex = nextTaskIndex + 1;

        if (this.repo.initialTasks[newTaskIndex].status === "later") {
            newTaskIndex += 1;
        }

        return newTaskIndex;
    }

    private getNextTaskIndex() {
        let currentTaskIndex: number = this.repo.initialTasks.length - 1;

        while(currentTaskIndex > 0) {
            if (this.repo.initialTasks[currentTaskIndex].status === "next") {
                return currentTaskIndex;
            }

            currentTaskIndex -= 1;
        }

        return currentTaskIndex;
    }
}

type Task = {
    name: string;
    status: "new" | "next" | "later";
}

class TaskRepository {
    initialTasks: Task[];

    feed(tasks: Task[]) {
        this.initialTasks = tasks;
    }
}

describe("US-1 - Afficher deux tâche en comparaison", () => {
    it("US-1-AC-1 : Sans priorité, on affiche les deux premières tâches", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository();
        sut.repo.feed([
            {name: "Envoyer un mail à la direction", status: "new"},
            {name: "Nettoyer mon bureau", status: "new"},
            {name: "Payer la facture d'électricité", status: "new"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ])


        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Envoyer un mail à la direction",
            status: "new"
        }, {name: "Nettoyer mon bureau", status: "new"}]);
    });

    it("US-1-AC-2 : Avec une tâche priorisée (next) et une tâche comparée (later), on affiche la tâche priorisée et la première tâche non priorisée et non comparée", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository()
        sut.repo.initialTasks = [
            {name: "Envoyer un mail à la direction", status: "next"},
            {name: "Nettoyer mon bureau", status: "later"},
            {name: "Payer la facture d'électricité", status: "new"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Envoyer un mail à la direction",
            status: "next"
        }, {name: "Payer la facture d'électricité", status: "new"}]);
    });

    it("US-1-AC-3 : xxx", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository()
        sut.repo.initialTasks = [
            {name: "Envoyer un mail à la direction", status: "next"},
            {name: "Nettoyer mon bureau", status: "next"},
            {name: "Payer la facture d'électricité", status: "new"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Nettoyer mon bureau",status: "next"
        }, {name: "Payer la facture d'électricité", status: "new"}]);
    });


    it("US-1-AC-4 : xxx", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository()
        sut.repo.initialTasks = [
            {name: "Envoyer un mail à la direction", status: "next"},
            {name: "Nettoyer mon bureau", status: "next"},
            {name: "Payer la facture d'électricité", status: "later"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Nettoyer mon bureau",status: "next"
        }, {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"}]);
    });


    it("US-1-AC-5 : xxx", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository()
        sut.repo.initialTasks = [
            {name: "Envoyer un mail à la direction", status: "next"},
            {name: "Nettoyer mon bureau", status: "next"},
            {name: "Payer la facture d'électricité", status: "next"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Payer la facture d'électricité",status: "next"
        }, {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"}]);
    });


    it("US-1-AC-6 : xxx", () => {
        // GIVEN
        const sut = new TaskFvpQuery();
        sut.repo = new TaskRepository()
        sut.repo.initialTasks = [
            {name: "Envoyer un mail à la direction", status: "next"},
            {name: "Nettoyer mon bureau", status: "later"},
            {name: "Payer la facture d'électricité", status: "next"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = sut.query()
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{
            name: "Payer la facture d'électricité",status: "next"
        }, {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"}]);
    });

    

})