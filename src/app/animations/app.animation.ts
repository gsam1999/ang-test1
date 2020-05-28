import { trigger, state, style, animate, transition } from  '@angular/animations';

export function visibility(){

    return trigger('visibility',[
        state('shown', style({
          transform :'scale(1.0)',
          opacity:1
        })),
        state('hidden',style({
          transform:'scale(0.5)',
          opacity:0
        })),
        transition('* => *',animate('0.5s ease-in-out'))
      ]);
}

export function flyInOut(){
    return trigger('flyInOut',[
        state('*',style({
            opacity:1,
            transform:'translateX(0)'
        })),
        transition(':enter',[
            style({transform:'translateX(-100%)'}),
            animate(500)
        ]),
        transition(':leave',[
            animate('500ms ease-out', style({transform:'translateX(100%)',opacity:0}))
        ])
    ]);
}

export function newFly()
{
    return trigger('newFly',[
        transition(':enter',[
            style({transform:'translateY(100%)'}),
            animate(500)
    
        ]),
        transition(':leave',[
            style({transform:'translateX(50%)'}),
            animate('1000ms ease-out', style({transform:'translateY(100%)',opacity:0}))
        ])
    ]);
}

export function expand(){
    return trigger('expand',[
        state("*",style({
            opacity:1,
            transform:'transformY(0)'
        })),
        transition(':enter',[
            style({
                transform:'translateY(-50%)'
            }),
            animate('200ms ease-in',style({
                opacity:1,
                transform:'transformY(0)'
            }))
        ])
    ]);

}