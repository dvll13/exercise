// Loops labeling
{
    outerloop:
    for (var i=0; i<5; i++) {
        if (something()) {
            innerloop:
            for (var j=0; j<5; j++) {
                if (somethingElse()) {
                    break innerloop;
                } else {
                    break outerloop;
                }
            }
        }
    }
}