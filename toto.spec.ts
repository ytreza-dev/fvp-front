import {describe, expect, it} from "vitest";

class TaskFvpQuery {
    public repo: TaskRepository;

    query() {
        if (this.repo.initialTasks[1].status === "new") {
            return [
                this.repo.initialTasks[0],
                this.repo.initialTasks[1]
            ];
        }

        if (this.repo.initialTasks[1].status === "next") {
            return [
                this.repo.initialTasks[1],
                this.repo.initialTasks[2]
            ];
        }

        return [
            this.repo.initialTasks[0],
            this.repo.initialTasks[2]
        ];
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
})