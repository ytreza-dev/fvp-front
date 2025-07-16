import {describe, expect, it} from "vitest";

class TaskFvpQuery {
}

type Task = {
    name: string;
    status: "new" | "next" | "later";
}

describe("US-1 - Afficher deux tâche en comparaison", () => {
    it("US-1-AC-1 : Sans priorité, on affiche les deux premières tâches", () => {
        // GIVEN
        const initialTasks = [
            {name: "Envoyer un mail à la direction", status: "new"},
            {name: "Nettoyer mon bureau", status: "new"},
            {name: "Payer la facture d'électricité", status: "new"},
            {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
        ];

        // WHEN
        let tasksCompared = initialTasks.slice(0, 2);
        // Quand
        // on affiche la comparaison

        // THEN
        expect(tasksCompared).toStrictEqual([{name: "Envoyer un mail à la direction", status: "new"}, {name: "Nettoyer mon bureau", status: "new"}]);
    });

   it("US-1-AC-2 : Sans priorité, on affiche les deux premières tâches", () => {
       // GIVEN


       const sut = new TaskFvpQuery();


       const initialTasks: [Task] = [
           {name: "Envoyer un mail à la direction", status: "next"},
           {name: "Nettoyer mon bureau", status: "later"},
           {name: "Payer la facture d'électricité", status: "new"},
           {name: "Corriger le bug qui fait perdre de l'argent au client", status: "new"},
       ];

       // WHEN
       let tasksCompared = [
              initialTasks[0],
              initialTasks[2]
       ];
       // Quand
       // on affiche la comparaison

       // THEN
       expect(tasksCompared).toStrictEqual([{name: "Envoyer un mail à la direction", status: "next"}, {name: "Payer la facture d'électricité", status: "new"}]);
    });
})